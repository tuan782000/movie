import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const MediaList = ({ title, tabs }) => {
  const [mediaList, setMediaList] = useState([]);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id);

  useEffect(() => {
    const url = tabs.find((tab) => tab.id === activeTabId)?.url;
    if (url) {
      fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
        },
      }).then(async (res) => {
        const data = await res.json();
        console.log({ data });
        const trendingMediaList = data.results.splice(0, 12);
        setMediaList(trendingMediaList);
      });
    }
  }, [activeTabId, tabs]);

  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">{title}</p>
        <ul className="flex rounded border border-white">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${activeTabId === tab.id ? "bg-white text-black" : ""}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type || activeTabId}
          />
        ))}
      </div>
    </div>
  );
};
export default MediaList;

/*
Logic call api

khi người dùng nhấn vào tab trên giao diện

- 3 cái tab được render từ TABS và có id tương ứng 1 phần trong api và value tương ứng phần hiển thị cho người dùng
- trong mỗi cái li có gắn sự kiện onClick mỗi onClick sẽ setActiveTabId 1 cái giá trị mới dựa vào id của mỗi tab
- lúc này activeTabId thay đổi thì component sẽ tạo ra trigger giúp re-render - mà useEFfect có theo dõi activeTabId cho nên useEFfect cũng được chạy lại hàm callback với cái giá trị activeTabId mới lúc này sẽ load lại mediaList

- mediaList lấy ra 20 cái đang hot nhất
- chuyển xuống MovieCard và CircularProgressBar xử lý hiển thị

*/
