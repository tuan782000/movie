import CircularProgressBar from "@components/CircularProgressBar";
import { Link } from "react-router-dom";
import ImageComponent from "./Image";

const MovieCard = (props) => {
  const { id, title, releaseDate, poster, point, mediaType } = props;
  return (
    <Link to={`/movie/${id}`} className="rounded-lg border border-slate-800">
      <div className="relative">
        {mediaType === "tv" && (
          <p className="absolute right-1 top-1 rounded bg-black px-1 py-0.5 text-sm font-bold text-white shadow-md">
            TV Show
          </p>
        )}
        {/* <img
          className="w-full rounded-lg"
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt=""
          width={210}
          height={300}
        /> */}
        <ImageComponent
          className={"w-full rounded-lg"}
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          width={210}
          height={300}
        />
        <div className="relative -top-[1.5vw] px-4">
          <CircularProgressBar
            percent={Math.round(point * 10)}
            strokeColor={point >= 7 ? "green" : point >= 5 ? "orange" : "red"}
          />
          <p className="mt-2 font-bold">{title}</p>
          <p className="text-slate-300">{releaseDate}</p>
        </div>
      </div>
    </Link>
  );
};
export default MovieCard;

/*
rounded-lg border border-slate-800: - bo 4 góc 0.5rem 8px border lên viền viền của nó có màu slate 800
rounded-lg bo thêm cho phần ảnh

relative -top-[1.5vw] px-4 giúp nội dung card cách ra px trái phải 16px - relative cố định -top-[1.5vw] cách top theo view port width
mt-2 font-bold cách top 8px và in đậm
text-slate-300: đổi màu

absolute right-1 top-1 rounded bg-black text-sm font-bold text-white shadow-md: abosolute ăn theo relative cha - right 1 top 1 right 4px và top 4px rounded bo góc bg-black màu nền là đen text-sm thì small font-bold in đậm lên và màu trắng tex-white sau đó có shadow-md là box shadow
*/

/*
Hiện tại là đang bị Cumulative Layout Shift (CLS)

có nghĩa ảnh chưa load xong Image co lại - load xong ảnh nở ra

để giải quyết vấn đề này mình nên đặt cho nó 1 width và height cố định - để đặt chỗ trước cho ảnh trước khi load xong - sau khi load xong nó sẽ không bị nở ra gây cho người dùng UX không tốt

ngoài ra mình phải đặt w-full cho ảnh lúc nào ảnh cũng chiếm hết chiều ngang được đặt

---
bổ sung thuộc tính w-full cho ảnh

và đặt width height cố định

Mặc dù set width height - nhưng vẫn sẽ gặp vấn đề ảnh sẽ hiện từ từ lên

Áp dụng thêm kỹ thuật blur loading

Tạo Image Component - có blur áp dụng cho tất cả


*/
