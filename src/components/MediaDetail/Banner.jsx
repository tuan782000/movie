import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { groupBy } from "lodash";
import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/Image";

const Banner = (props) => {
  const {
    title,
    backdropPath,
    posterPath,
    certification,
    releaseDate,
    genres,
    point = 0,
    overview,
    crews,
  } = props;
  // nhãn nó là 1 dữ liệu lồng rất nhiều lấy ra 1 biến để lưu trữ
  // const certification = (
  //   (mediaInfo.release_dates?.results || []).find(
  //     (result) => result.iso_3166_1 === "US",
  //   )?.release_dates || []
  // ).find((releaseDate) => releaseDate.certification)?.certification;

  // const crews = (mediaInfo.credits?.crew || [])
  //   .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
  //   .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  // sử dụng lodash để có hàm groupBy
  const groupedCrews = groupBy(crews, "job");
  // console.log({ crews, groupedCrews });

  return (
    <div className="relative overflow-hidden text-white shadow-sm shadow-slate-800">
      {/* Đây là background */}
      {/* inset-0: top-0 left-0 right-0 bottom-0 */}
      <ImageComponent
        className="absolute inset-0 aspect-video w-full brightness-[.2]"
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        alt=""
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-8 sm:gap-8">
        {/* Đây là ảnh */}
        <div className="flex-1">
          <ImageComponent
            className="w-full"
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${posterPath}`}
            alt=""
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification}
            </span>
            <p>{releaseDate}</p>
            <p>{(genres || []).map((genre) => genre.name).join(", ")}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                // percent={Math.round((point || 0) * 10)}
                percent={Math.round(point * 10)}
                strokeWidth={0.3}
                size={3.5}
                strokeColor={
                  point >= 7 ? "green" : point >= 5 ? "orange" : "red"
                }
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
            <p>{overview}</p>
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
export default Banner;
