import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const TABS = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "movie",
    name: "Movie",
  },
  {
    id: "tv",
    name: "Tv Show",
  },
];

const MediaList = () => {
  const [mediaList, setMediaList] = useState([]);
  // muốn nhấn vào các cái tab thì api sẽ lấy ra dữ liệu khác nhau ví dụ từ all sang TV show - sang Movie
  // cách giải quyết là mình dùng state để lưu trạng thái của tab
  // const [activeTabId, setActiveTabId] = useState("all");
  const [activeTabId, setActiveTabId] = useState(TABS[0].id); // nâng cấp lên - như cú pháp cũ ở trên
  // dựa vào activeTabId thay thế cho string trong api

  // VIỆC CHẠY LẦN ĐẦU NÓ SẼ CHẠY CALLBACK TRƯỚC
  // Ở LẦN TIẾP THEO NÓ SẼ XEM THAM SỐ THỨ 2 TRƯỚC SAU ĐÓ MỚI CHẠY CALLBACK "THAM SỐ THỨ 1"
  // VIỆC ĐỂ [activeTabId] NÀY GIÚP KHI activeTabId THAY ĐỔI THÌ TẠO TRIGGER GỌI GIÚP CHẠY LẠI USEEFFECT
  useEffect(() => {
    // khi bạn sử dụng 1 biến bên ngoài useEffect cụ thể activeTabId thì dependencies sẽ cảnh báo - buộc bạn phải bỏ biến đó vào dependencies
    fetch(`https://api.themoviedb.org/3/trending/${activeTabId}/day`, {
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
  }, [activeTabId]);
  // Nếu không có activeTabId thì useEffect sẽ [] rỗng và chạy 1 lần duy nhất - điều này chứng tỏ nếu [] thì không tạo trigger để chạy callback của useEffect ở lần render tiếp theo - không bao giờ chạy lần 2 - nhưng nếu có activeTabId thì nó sẽ có chạy lần 2 - n lần nếu như activeTabId có sự thay đổi.
  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">Trending</p>
        <ul className="flex rounded border border-white">
          {TABS.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer rounded px-2 py-1 ${activeTabId === tab.id ? "bg-white text-black" : ""}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.name}
            </li>
          ))}
          {/* <li className="cursor-pointer rounded bg-white px-2 py-1 text-black">
            All
          </li>
          <li className="cursor-pointer rounded px-2 py-1">Movie</li>
          <li className="cursor-pointer rounded px-2 py-1">Tv Show</li> */}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {mediaList.map((media) => (
          <MovieCard
            key={media.id}
            title={media.title || media.name}
            releaseDate={media.release_date || media.first_air_date}
            poster={media.poster_path}
            point={media.vote_average}
            mediaType={media.media_type}
          />
        ))}
        {/* <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard /> */}
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
