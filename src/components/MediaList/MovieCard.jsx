import CircularProgressBar from "./CircularProgressBar";

const MovieCard = (props) => {
  const { title, releaseDate, poster, point, mediaType } = props;
  return (
    <div className="relative rounded-lg border border-slate-800">
      {mediaType === "tv" && (
        <p className="absolute right-1 top-1 rounded bg-black px-1 py-0.5 text-sm font-bold text-white shadow-md">
          TV Show
        </p>
      )}
      <img
        className="rounded-lg"
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt=""
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
