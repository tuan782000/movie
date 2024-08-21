import CircularProgressBar from "./CircularProgressBar";

const MovieCard = () => {
  return (
    <div className="rounded-lg border border-slate-800">
      <img
        className="rounded-lg"
        src="https://i.ebayimg.com/images/g/MVQAAOSwbtBjBhF2/s-l1200.jpg"
        alt=""
      />
      <div className="relative -top-[1.5vw] px-4">
        <CircularProgressBar />
        <p className="mt-2 font-bold">Ghost Rider</p>
        <p className="text-slate-300">2024-08-19</p>
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
*/
