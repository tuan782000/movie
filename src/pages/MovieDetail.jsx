import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useState } from "react";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import ActorList from "@components/MediaDetail/ActorList";
import MovieInfomation from "@components/MediaDetail/MovieInfomation";
import useFetch from "@hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();

  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits`,
  });

  const {
    data: recommandationsResponse,
    isLoading: isRelatedMovieListLoading,
  } = useFetch({
    url: `/movie/${id}/recommendations`,
  });

  const relatedMovies = recommandationsResponse.results || [];

  const certification = (
    (movieInfo.release_dates?.results || []).find(
      (result) => result.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (movieInfo.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew.job))
    .map((crew) => ({ id: crew.id, job: crew.job, name: crew.name }));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner
        title={movieInfo.title}
        backdropPath={movieInfo.backdrop_path}
        posterPath={movieInfo.poster_path}
        releaseDate={movieInfo.release_date}
        genres={movieInfo.genres}
        point={movieInfo.vote_average}
        overview={movieInfo.overview}
        certification={certification}
        crews={crews}
      />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast || []} />
            {/* || [] đề phòng movieInfo.credits?.cast bị undefined thì nó sẽ thế vào là array rỗng chứ không trả về undefined */}
            <RelatedMediaList
              mediaList={relatedMovies}
              isLoading={isRelatedMovieListLoading}
            />
          </div>
          <div className="flex-1">
            {/* <p className="mb-4 text-[1.4vw] font-bold">Information</p> */}
            <MovieInfomation movieInfo={movieInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetail;
