import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  return (
    <div>
      <header className="flex h-14 items-center justify-between bg-slate-950 px-8 text-white">
        <div className="flex items-center gap-4">
          <img src="./netflix.png" className="w-16 sm:w-28" />
          <a href="#">Phim</a>
          <a href="#">Truyền hình</a>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="cursor-pointer"
          />
        </div>
      </header>
    </div>
  );
};
export default App;

/*
  Phân tích:
  div tổng bọc header
  bên trong header mình sẽ chia ra làm 2 bên trái và phải
  Bên trái logo - phim - truyền hình
  Bên phải icon search

  Để chia được 2 bên cùng nằm 1 hàng flex - đặt chiều cao cho header h-14 - canh cho mọi thứ nằm ngay hàng thẳng lối items-center - giúp tách biệt trái phải justify-between - màu nền bg-slate-950 text-white chữ màu trắng

  Xử lý bên trái: cho logo và các chữ nằm trên 1 hàng flex - item-center mọi thứ ngay hàng thẳng lối - gap tạo khoảng cách giữa các item
  Xử lý bên phải: cursor-pointer để người dùng biết nhấn được
*/
