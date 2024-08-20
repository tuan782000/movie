import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";

const FeatureMovie = () => {
  return (
    <div className="relative text-white">
      <Movie />
      <PaginateIndicator />
    </div>
  );
};
export default FeatureMovie;
