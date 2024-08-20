import MovieCard from "./MovieCard";

const MediaList = () => {
  return (
    <div className="bg-black px-8 py-10 text-[1.2vw] text-white">
      <div className="mb-6 flex items-center gap-4">
        <p className="text-[2vw] font-bold">Trending</p>
        <ul className="flex rounded border border-white">
          <li className="cursor-pointer rounded bg-white px-2 py-1 text-black">
            All
          </li>
          <li className="cursor-pointer rounded px-2 py-1">Movie</li>
          <li className="cursor-pointer rounded px-2 py-1">Tv Show</li>
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
};
export default MediaList;

/*
div tổng px-8 py-10 text-[1.2vw] bg-black text-white: padding trái phải 32px - py: padding top padding bottom 40px - font-size: 1.2vw; so với view width của màn hình - có background màu đen và chữ sẽ là màu trắng

div tương trưng cho header - mb-6 flex items-center gap-4 - Xác định lại trục chính sẽ là x ngàng - và trục phụ sẽ là y "đối với thuộc tính flex". Sau đó items-center là giúp canh cho trục phụ truc y trục dọc hiện tại canh mọi thứ nằm giữa "trên - dưới". gap-4: khoảng cách giữa các item sẽ là 16px. Trong này tạm thời có 2 item khoảng cách từ item này đến item kia là 16 - mb-6 cách nội dung bên dưới 24px

text-[2vw] font-bold: làm cho chữ có font-size tương ứng font-size: 2vw; và in đậm

flex rounded border border-white: mọi item bên trong nằm trên 1 hàng - bo góc - có border - màu border màu trắng

cursor-pointer rounded bg-white px-2 py-1 text-black - cho mọi người hover vào người dùng biết có thể nhấn được- bo góc màu trắng backgroudn cũng mày trắng padding trái phải 8px padding trên dưới 4px chữ màu đen

cursor-pointer rounded px-2 py-1 chuột hình bàn tay khi hover vào bo góc và cách nội dung ngang 8px các trên dưới 4px

grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6: gird là tổ chức theo dạng lưới - ở màn hình mobile hiện 2 card - trên màn hình tablet hiện 4 card còn lại 6 card

*/
