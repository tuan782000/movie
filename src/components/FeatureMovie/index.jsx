import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";

// accesstoken: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68

// Api key: 528a94c5bb1a52307b5de99adc3759b7

const FeatureMovie = () => {
  const [movies, setMovies] = useState([]);

  // để slide hoạt động cần phải có 1 state để lưu trữ vị trí của slide hiện tại
  const [activeMovieId, setActiveMovieId] = useState(); // lý do không gán giá trị mặc định - vì movies lần đầu tiên nó 1 mảng rỗng - cho nên ko biết activeMovieId là cái nào cho nên để undefinded

  // xử lý
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
      },
    }).then(async (res) => {
      const data = await res.json();
      const popularMovies = data.results.splice(0, 4); // bắt đầu vị trí thứ 0 - lấy ra 4 item - 0 1 2 3 đủ rồi cắt
      // setMovies(data.results);
      setMovies(popularMovies);
      setActiveMovieId(popularMovies[0].id); // lúc này có dữ liêu nên có thể set cho cái activeMovieId
    });
  }, []);

  // console.log(movies);

  return (
    <div className="relative text-white">
      {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}
      {/* <Movie data={movies[0]} /> */}
      <PaginateIndicator
        movies={movies}
        activeMovieId={activeMovieId}
        setActiveMovieId={setActiveMovieId}
      />
    </div>
  );
};
export default FeatureMovie;

/*
  slide có ý nghĩa như sau:

  Đầu tiên tạo ra const [activeMovieId, setActiveMovieId] = useState(); mục đích lưu id của movie đó sau này để slide

  khi có dữ liệu trả về db setActiveMovieId để set id đầu tiên lấy về vào

  trước khi map phải filter để lấy ra movie duy nhất có id trùng với activeMovieId, sau đó tiến hành map nó ra để hiển thị

  {movies
        .filter((movie) => movie.id === activeMovieId)
        .map((movie) => (
          <Movie key={movie.id} data={movie} />
        ))}

  tiếp theo PaginateIndicator mình sẽ dựa vào movies để map nó ra tương ứng với số lượng slide
*/
