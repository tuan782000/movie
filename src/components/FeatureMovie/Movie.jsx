import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Movie = () => {
  return (
    <div>
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
    </div>
  );
};
export default Movie;
