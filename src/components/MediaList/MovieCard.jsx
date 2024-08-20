const MovieCard = () => {
  return (
    <div className="rounded-lg border border-slate-800">
      <img
        className="rounded-lg"
        src="https://i.ebayimg.com/images/g/MVQAAOSwbtBjBhF2/s-l1200.jpg"
        alt=""
      />
      <div className="px-4 py-2">
        <p>69</p>
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

px-4 py-2 giúp nội dung card cách ra px trái phải 16px và trên dưới 8px
mt-2 font-bold cách top 8px và in đậm
text-slate-300: đổi màu
*/
