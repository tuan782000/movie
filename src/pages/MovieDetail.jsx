import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import CircularProgressBar from "../components/CircularProgressBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import _ from "lodash";
import Loading from "../components/Loading";

const MovieDetail = () => {
  const { id } = useParams(); // sử dụng destructuring để lấy ra id
  const [movieInfo, setMovieInfo] = useState({}); // mặc định là 1 empty object - khi có dữ liệu sẽ set lại object mới

  // khi mà loading dữ liệu ta cần phải có 1 state để lưu trữ trạng thái Loading
  const [isLoading, setIsLoading] = useState(false);

  // sử dụng 1 id ở phía bên ngoài useEffect - thì phải bổ sung vào dependencies
  useEffect(() => {
    setIsLoading(true);
    // https://api.themoviedb.org/3/movie/{movie_id}
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
        },
      },
    )
      .then(async (res) => {
        const data = await res.json();
        console.log({ data });
        setMovieInfo(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  // sau khi lấy xong dữ liệu api ta phải nghĩ ngay đến việc lưu trữ đống dữ liệu đó vào 1 state

  // nhãn nó là 1 dữ liệu lồng rất nhiều lấy ra 1 biến để lưu trữ
  const certification = (
    (movieInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  // giải thích movieInfo là 1 object - tham chiếu đến release_dates cái release_dates mình sẽ lấy thêm từ parmas "?" là append_to_response=release_dates
  // lúc này ta có thêm release_dates và nó là 1 object chứa results - results là 1 mảng nên có thể là rỗng nếu call dữ liệu thất bại hoặc bản thân nó không có
  // cho nên mình đặt các trường hợp không có hoặc call thất bại []. Tránh trả về undefined
  // result là mỗi phần tử bên trong mảng - tham chiếu đến result và lấy ra iso_3166_1 và nếu thằng nào thoả điều kiện kiện "US"
  // Sau đó sẽ thấy có release_dates là 1 array khác và nếu nó có thì không sao nếu rỗng thì nên đặt cho nó [] để tránh việc undefined
  // tìm kiếm tiếp releaseDate có releaseDate.certification để lấy ra thuộc tính certification sau đó tìm xong trả về lưu vào biến certification

  // {movieInfo.genres || []} vì genres trả về là array nếu nó rỗng thì sao cho nên mình sẽ để [] tránh bị undefined
  // {(movieInfo.genres || []).map((genre) => genre.name).join(", ")} khi map ra thành công lúc này chỉ lấy về mỗi thuộc tính name của mỗi genre
  // lúc này trả về toàn string mình sẽ dùng them js join để thêm từng giấy ", "

  // những biến tạo ra ở đây là những dữ liệu phức tạp - được thêm vào từ việc call api
  // crews: đội ngũ sản xuất
  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  // Đầu tiên tìm ra credits dựa vào tham chiếu movieInfo - sau đó nếu có tham chiếu đến crew - nếu crew rỗng gán object rỗng tránh undefined - trường hợp có dữ liệu thì sau đó filter ra từng crew còn (item) dựa vào điều kiện ["Director", "Screenplay", "Writer"].includes(crew.job)) cái crew.job phải thoả mãn 3 cái yêu cầu "Director", "Screenplay", "Writer" sau khi có dữ liệu mình không muốn lấy ra hết chỉ lấy ra id name và job thì phải map biến đổi kiểu dữ liệu bọc nó trong () tránh mỗi ngoặc nhọn {} hiểu lầm - custom lại kiểu dữ liệu trả về bên trong {}

  // viêc trả về xong - nhưng sẽ phải nhóm lại đâu là giám đốc đâu là tác giả viết
  // sử dụng lodash để có hàm groupBy
  const groupedCrews = _.groupBy(crews, "job");
  console.log({ crews, groupedCrews });
  // groupedCrews: nó sẽ lấy job làm key

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-hidden text-white">
      {/* Đây là background */}
      {/* inset-0: top-0 left-0 right-0 bottom-0 */}
      <img
        className="absolute inset-0 brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`}
        alt=""
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-8 sm:gap-8">
        {/* Đây là ảnh */}
        <div className="flex-1">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
            alt=""
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{movieInfo.title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{movieInfo.release_date}</p>
            <p>
              {(movieInfo.genres || []).map((genre) => genre.name).join(", ")}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round(movieInfo.vote_average * 10)}
                strokeWidth={0.3}
                size={3.5}
              />
              Rating
            </div>
            <button>
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{movieInfo.overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map((crew) => crew.name).join(", ")}</p>
              </div>
            ))}
            {/* <div>
          <p className="font-bold">Director</p>
          <p>Jenifer Phang</p>
        </div>
        <div>
          <p className="font-bold">Writer</p>
          <p>Dan Frey, ReuSell Sommer</p>
        </div> */}
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
