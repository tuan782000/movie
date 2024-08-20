import { faMagnifyingGlass, faPlay } from "@fortawesome/free-solid-svg-icons";
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
      <div className="relative text-white">
        <img
          src="https://callmeviolet.com/wp-content/uploads/2024/06/inside-out-2-movie-min-scaled.jpg"
          alt=""
          className="aspect-video brightness-50"
        />
        <div className="absolute bottom-[10%] left-8 w-1/2 sm:w-1/3">
          <p className="mb-2 font-bold sm:text-[2vw]">Inside Out 2</p>
          <div>
            <p className="mb-1 inline-block border border-gray-400 p-1 text-gray-400">
              PG-13
            </p>
            <p className="text-[1.2vw]">2024-06-11</p>
          </div>
          <div>
            <div className="mt-4 hidden text-[1.2vw] sm:block">
              <p className="mb-2 font-bold">Overview</p>
              <p>
                Inside Out 2 is a Pixar animated film that follows the life of
                Riley Andersen as she navigates the complexities of adolescence.
                The sequel to the beloved 2015 film, it delves deeper into the
                human mind, introducing new emotions and challenges.
              </p>
            </div>
            <div className="mt-4">
              <button className="text-10 mr-2 rounded bg-white px-4 py-2 text-black lg:text-lg">
                <FontAwesomeIcon icon={faPlay} /> Trailer
              </button>
              <button className="text-10 rounded bg-slate-300/35 px-4 py-2 lg:text-lg">
                View Detail
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[10%] right-8">
          <ul className="flex gap-1">
            <li className="h-1 w-6 cursor-pointer bg-slate-100"></li>
            <li className="h-1 w-6 cursor-pointer bg-slate-600"></li>
            <li className="h-1 w-6 cursor-pointer bg-slate-600"></li>
            <li className="h-1 w-6 cursor-pointer bg-slate-600"></li>
          </ul>
        </div>
      </div>
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

/*
xử lý phần nội dung ảnh

.aspect-video {
  aspect-ratio: 16 / 9;
}

đảm bảo ảnh luôn hiển thị theo 16 / 9 co giãn

brightness-50: giảm độ sáng của ảnh - nó sẽ giảm đi theo con số

Để cho phần nội dung nổi trên phần ảnh:
set cha nó div set relative
ảnh không cần set
nội dung thì set absolute - để nó rời hẳn khỏi vị trí mặc định

bottom-[10%]: cách từ vị trí đó đến bottom 10% tuỳ thuộc màn hình tính toán lại
left-8:  cách vị trí trái 8x4 = 32px
w-1/3: width: 33.33% chiếm 1/3

w-1/2 sm:w-1/3 - đối với màn hình mobile nhỏ hơn 670px thì w-1/2 sm"670" những màn hình lơn hơn sm thì 1/3 cho nội dung text

mb-2 font-bold sm:text-[2vw]: cách dưới khoảng 2x4 là 8 - viết hoa kèm với màn hình không phải mobile text sẽ giản nở font đó 2 vw - 2% của chiều rộng toàn bộ trình duyệt - do thẻ này đang là block chiếm hết 2% cái mà nó chiếm

mb-1 inline-block border border-gray-400 p-1 text-gray-400: Này nó là thẻ p là 1 thẻ block dùng margin được mb-1 1/4 0.25 rem tương ứng 4px - biến nó thành thẻ inline-block để loại bỏ thuộc tính chiếm hết phần ngang của block - border tạo viền "viền 1px" - border-gray-400 màu border trùng màu chữ - p-1 padding 4px 


text-[1.2vw]: text có thể 1.2 so với màn hình - nếu size đó chưa tailwind cung cấp nhớ bọc trong []

Trong Tailwind CSS, text-[1.2vw] sẽ lấy theo chiều rộng của viewport (cửa sổ trình duyệt).

Giải thích:

vw: Đơn vị vw trong CSS đại diện cho 1% của chiều rộng viewport.
text-[1.2vw]: Cú pháp này trong Tailwind CSS có nghĩa là đặt kích thước font chữ bằng 1.2% của chiều rộng viewport.
Viewport: Là khu vực khả kiến của trang web trên màn hình người dùng, bao gồm cả thanh cuộn (nếu có).

mt-4 hidden text-[1.2vw] sm:block: margin top 16px - ẩn đi -text có font-size tăng theo viewport màn hình lơn hơn sm thì mới hiển thị

rounded bg-white px-4 py-2 text-[10px] text-black lg:text-lg - rounded: border cho viền bg-white: nền trắng px- padding trái phải 16px py padding top bottom là 8px text-[10px]: 10px cở chữ text-black: chữ màu đen  lg:text-lg: đối với màn hình lg màn hình lớn hơn 1024 text nở lên sao cho bằng

Thay vì text-[10px] thì ta đã custom nó ở tailwind.config.js 10px nên text-10 tương ứng 10px

text-10 rounded bg-slate-300/35 px-4 py-2 lg:text-lg: text-10 đã custom bằng 10px rounded viền border bg-slate-300/35 - có / là opacity

absolute bottom-[10%] right-8 - nó dựa vào relative cách 10% cách phải 32px

flex gap-1 - cho các item nằm ngang cách nhau 4px

h-1 w-6 cursor-pointer bg-slate-100 - height 4px và width 24px màu khác nhau

h-1 w-6 cursor-pointer bg-slate-600 - height 4px và width 24px màu khác nhau
*/
