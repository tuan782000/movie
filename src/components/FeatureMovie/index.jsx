import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState, useRef } from "react";
import useFetch from "@hooks/useFetch";

// accesstoken: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68

// Api key: 528a94c5bb1a52307b5de99adc3759b7

const delay = 5000;

const FeatureMovie = () => {
  // const [movies, setMovies] = useState([]);

  // để slide hoạt động cần phải có 1 state để lưu trữ vị trí của slide hiện tại
  const [activeMovieId, setActiveMovieId] = useState(); // lý do không gán giá trị mặc định - vì movies lần đầu tiên nó 1 mảng rỗng - cho nên ko biết activeMovieId là cái nào cho nên để undefinded

  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  // xử lý
  // useEffect(() => {
  //   fetch("https://api.themoviedb.org/3/movie/popular", {
  //     method: "GET",
  //     headers: {
  //       accept: "application/json",
  //       Authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
  //     },
  //   }).then(async (res) => {
  //     const data = await res.json();
  //     const popularMovies = data.results.splice(0, 4); // bắt đầu vị trí thứ 0 - lấy ra 4 item - 0 1 2 3 đủ rồi cắt
  //     // setMovies(data.results);
  //     setMovies(popularMovies);
  //     setActiveMovieId(popularMovies[0].id); // lúc này có dữ liêu nên có thể set cho cái activeMovieId
  //   });
  // }, []);

  const { data: popularMoviesResponse } = useFetch({ url: "/movie/popular" });

  const movies = (popularMoviesResponse.results || []).slice(0, 4);

  useEffect(() => {
    if (movies[0]?.id) {
      setActiveMovieId(movies[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(movies)]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveMovieId((prevId) => {
        const currentIndex = movies.findIndex((movie) => movie.id === prevId);
        return currentIndex === movies.length - 1
          ? movies[0].id
          : movies[currentIndex + 1].id;
      });
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [activeMovieId, movies]);

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
  Giải bài tập:
  Mình sẽ áp dùng useRef và cái useEffect để giải quyết vấn đề này

  khai báo ra thời gian mà slide sẽ chuyển động
  const delay = 5000;

  Khai báo đến thằng mình sẽ tác động
  timeoutRef sử dụng useRef để tạo một tham chiếu lưu trữ ID của setTimeout. useRef giữ giá trị này xuyên suốt các lần render mà không làm tái render component.
  const timeoutRef = useRef(null);

  Viết ra 1 hàm resetTimeout

  const resetTimeout = () => {
    Nếu mà có timeoutRef.current clear đi tránh vingf lập vô tận
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveMovieId((prevId) => {
        const currentIndex = movies.findIndex((movie) => movie.id === prevId);
        return currentIndex === movies.length - 1
          ? movies[0].id
          : movies[currentIndex + 1].id;
      });
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [activeMovieId, movies]);

  Lần đầu chạy: Khi useEffect chạy lần đầu tiên, nó sẽ gọi resetTimeout(). Vì timeoutRef.current đang là null, nên không có gì bị xóa bỏ.
Đặt setTimeout: Sau đó, timeoutRef.current được gán với ID của setTimeout. setTimeout này sẽ chạy sau mỗi 5 giây và gọi setActiveMovieId để cập nhật ID của movie hiện tại.
Cập nhật ID: setActiveMovieId nhận prevId (ID hiện tại) và tính toán ID mới dựa trên vị trí hiện tại trong mảng movies. Nếu đang ở slide cuối cùng, nó sẽ quay lại slide đầu tiên; nếu không, nó sẽ chuyển sang slide kế tiếp.
Cleanup: return trong useEffect trả về một hàm cleanup, sẽ chạy trước khi component unmount hoặc trước khi

Ý nghĩa: timeoutRef.current được gán với giá trị ID của setTimeout.

setTimeout: Đây là một hàm dựng sẵn trong JavaScript, nó sẽ thực hiện đoạn mã bên trong sau một khoảng thời gian được chỉ định (ở đây là delay - 5 giây).

Callback của setTimeout:

setActiveMovieId((prevId) => {...}):
setActiveMovieId là một hàm dùng để cập nhật trạng thái activeMovieId.
prevId là ID của movie hiện tại (trước khi cập nhật).
movies.findIndex((movie) => movie.id === prevId): Tìm chỉ số (index) của movie hiện tại trong mảng movies.
currentIndex === movies.length - 1 ? movies[0].id : movies[currentIndex + 1].id:
Nếu currentIndex là chỉ số cuối cùng trong mảng (movies.length - 1), có nghĩa là slide hiện tại là slide cuối cùng. Trong trường hợp này, nó sẽ trả về ID của slide đầu tiên (movies[0].id).
Nếu không, nó sẽ trả về ID của slide kế tiếp (movies[currentIndex + 1].id).
Mục đích: Mỗi khi setTimeout được kích hoạt (sau mỗi delay), trạng thái activeMovieId sẽ được cập nhật để chuyển sang slide tiếp theo hoặc quay lại slide đầu tiên nếu đã đến slide cuối.

Ý nghĩa: useEffect trả về một hàm cleanup, sẽ được chạy trước khi component bị unmount hoặc trước khi useEffect được chạy lại (tức là khi activeMovieId hoặc movies thay đổi).
Mục đích: Hàm này gọi lại resetTimeout() để xóa bỏ timeout hiện tại trước khi tạo timeout mới. Điều này ngăn việc tạo ra nhiều timeout không cần thiết, giúp duy trì logic hoạt động chính xác và tránh lỗi.

Ý nghĩa: Mảng dependency này chứa hai giá trị là activeMovieId và movies.
Mục đích: useEffect sẽ chạy lại mỗi khi một trong hai giá trị này thay đổi. Điều này đảm bảo rằng timeout sẽ được reset và thiết lập lại mỗi khi activeMovieId hoặc movies thay đổi, duy trì sự đồng bộ giữa dữ liệu và giao diện.
*/
