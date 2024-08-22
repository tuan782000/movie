import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import CircularProgressBar from "../components/CircularProgressBar";

const MovieDetail = () => {
  return (
    <div className="relative overflow-hidden text-white">
      {/* Đây là background */}
      {/* inset-0: top-0 left-0 right-0 bottom-0 */}
      <img
        className="absolute inset-0 brightness-[.2]"
        src="https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"
        alt=""
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-8 sm:gap-8">
        {/* Đây là ảnh */}
        <div className="flex-1">
          <img
            src="https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg"
            alt=""
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">Test</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">G</span>
            <p>2024/11/11</p>
            <p>Fantasy, Adventure, Family, Comedy</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar percent={90} strokeWidth={0.3} size={3.5} />
              Rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              alias et ab voluptatem debitis aliquam dolorem porro est
              asperiores at incidunt eius mollitia placeat, molestias cupiditate
              rerum quos, sunt illo.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <p className="font-bold">Director</p>
              <p>Jenifer Phang</p>
            </div>
            <div>
              <p className="font-bold">Writer</p>
              <p>Dan Frey, ReuSell Sommer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;

/*

aboslute và relative có z-index bằng nhau - nhưng sẽ xét tiếp thằng nào tạo ra cuối cùng thì thằng đó có z-index cao hơn

relative overflow-hidden text-white: cố định - position: relative;   overflow: hidden;
position: relative; - Định vị tương đối
overflow: hidden; - Ẩn nội dung tràn

absolute inset-0 brightness-[.2]: dõi theo relative gần nhất hoặc body nếu không có relative nào khác - inset-0: top-0 left-0 right-0 bottom-0
inset, top, right, bottom và left của một phần tử về giá trị 0. brightness: cháy sáng

*/
