import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import ActorList from "@components/MediaDetail/ActorList";
import MovieInfomation from "@components/MediaDetail/MovieInfomation";
import useFetch from "@hooks/useFetch";

const MovieDetail = () => {
  const { id } = useParams();
  // const [movieInfo, setMovieInfo] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isRelatedMovieListLoading, setIsRelatedMovieListLoading] =
    useState(false);

  // lúc này mình sẽ không cần state movieInfo nữa và state isLoading mình chỉ cần gán biến movieInfo vào data và sử dụng isLoading ở bên useFetch trả về là được
  const { data: movieInfo, isLoading } = useFetch({
    url: `/movie/${id}?append_to_response=release_dates,credits`,
    // method: 'GET' // method mặc định GET không cần truyền
    // không cần overide lại headers nên cũng không truyền - tự lấy giá trị mặc định
  });

  // useEffect(() => {
  //   setIsLoading(true);
  //   // https://api.themoviedb.org/3/movie/{movie_id}
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates,credits`,
  //     {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
  //       },
  //     },
  //   )
  //     .then(async (res) => {
  //       const data = await res.json();
  //       console.log({ data });
  //       setMovieInfo(data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [id]);

  useEffect(() => {
    setIsRelatedMovieListLoading(true);
    // https://api.themoviedb.org/3/movie/{movie_id}
    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log({ recommandation: data });
        // setMovieInfo(data);
        // api trả về có results nên tham chiếu - nếu không có thì mình sẽ mặc định gán array rỗng
        const currentRelatedMovies = (data.results || []).slice(0, 12);

        setRelatedMovies(currentRelatedMovies);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsRelatedMovieListLoading(false);
      });
  }, [id]);

  if (isLoading || isRelatedMovieListLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner mediaInfo={movieInfo} />
      <div className="bg-black text-[1.2vw] text-white">
        <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
          <div className="flex-[2]">
            <ActorList actors={movieInfo.credits?.cast || []} />
            {/* || [] đề phòng movieInfo.credits?.cast bị undefined thì nó sẽ thế vào là array rỗng chứ không trả về undefined */}
            <RelatedMediaList mediaList={relatedMovies} />
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
