import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useEffect, useState } from "react";

// accesstoken: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68

// Api key: 528a94c5bb1a52307b5de99adc3759b7

const FeatureMovie = () => {
  const [movies, setMovies] = useState([]);

  // xử lý
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/person/popular", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
      },
    }).then(async (res) => {
      const data = await res.json();
      setMovies(data.results);
    });
  }, []);

  console.log(movies);

  return (
    <div className="relative text-white">
      <Movie />
      <PaginateIndicator />
    </div>
  );
};
export default FeatureMovie;

/*
  Xử lý vòng lặp vô tận khi gọi API - đó là ta sẽ nhét đoạn call api vào bên trong useEffect

  tức là ta đang thông báo cho React biết rằng đoạn code call api này là 1 side Effect và nó sẽ thực hiện sau khi component này được render

  [] của useEffect là 1 dependencies array

  Giải thích code:

  Nó sẽ chạy từ trên xuống dưới

  ban đầu movies sẽ được tạo ra là rỗng - kèm đó 1 hàm để setMovies

  sau đó đi đến useEffects thì React sẽ lý đoạn code bên trong đó - hay chính là thàm số đầu tiên - callbacks - sau đó di chuyển tiếp xuống

  sau khi tới đây setMovies(data.results) tạo trigger làm component re-render chạy lại toàn bộ đoạn code ở trong component

  Và lúc này ở lần render thứ 2 thì movies đã có dữ liệu - 1 array có 20 phần tử

  chạy tiếp đến useEffect và nó sẽ kiểm tra tham số thứ 2 của useEffect thay vì tham số thứ 1 và tham số thứ 2 hiện tai là 1 dependencies array
 và nó đang là dữ liệu rỗng. Thì nó sẽ không thực thi lại cái callbacks - hay không thực thi lại function ở tham số thứ 1 giúp tránh rơi vào vòng lập vô tận
  

  Chú ý sử sụng useEFfect nên có dependencies array - vì không có thì tham số thứ 1 useEffect luôn luôn thực thi
*/
