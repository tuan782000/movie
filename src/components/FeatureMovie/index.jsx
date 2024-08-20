import PaginateIndicator from "./PaginateIndicator";
import Movie from "./Movie";
import { useState } from "react";

// accesstoken: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68

// Api key: 528a94c5bb1a52307b5de99adc3759b7

const FeatureMovie = () => {
  // Thay vì dùng 1 biến bình thường ta sẽ khai báo 1 state
  const [movies, setMovies] = useState([]); // khỏi tạo cho nó 1 array rỗng

  // việc code như này làm diễn ra vòng lặp vô tận vì sao

  /*
    call api - thành công lấy về dữ liệu - setMovies cập nhật dữ liệu - sau đó set lại movies vào trong state - việc cập nhật này làm re-render component - được load lại - việc load lại call api lấy ra dữ liệu tiếp => vòng lặp vô tận
  */

  // đây là 1 câu lệnh bất đồng bộ
  // fetch("https://api.themoviedb.org/3/person/popular", {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
  //   },
  // }).then(async (res) => {
  //   // console.log({ res });
  //   const data = await res.json();
  //   console.log({ data });
  //   // sau khi có dữ liệu trả về vào data - tiến hành cập nhật state - tạo ra trigger tác động cho component re-render
  //   // data là 1 object nên tham chiếu vào để lất ra results là array - tiến hành cập nhật
  //   setMovies(data.results);
  // });

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

  fetch("https://api.themoviedb.org/3/person/popular", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
    },
  }).then((res) => {
    console.log({ res });
  });

  Tham số đầu tiên là sẽ là api - https://api.themoviedb.org/3/person/popular
  Tham số thứ 2 là 1 object bên trong sẽ có
  - Phương thức "GET"
  - headers - header là 1 object
   + accept "Chấp nhận" application/json 
   + Authorization: "Bearer token"


   .then(async (res) => {
    // console.log({ res });
    const data = await res.json();
    console.log({ data });
  });

  Khi mà call api thành công thì res có trả về dữ liệu có then mới bắt được - đợi res.json() để lưu data việc chờ và đợi giúp giải quyết bất đồng bộ


  Tại sao không làm như cách sau để lấy ra data

  let response = {};
    // đây là 1 câu lệnh bất đồng bộ
  fetch("https://api.themoviedb.org/3/person/popular", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhhOTRjNWJiMWE1MjMwN2I1ZGU5OWFkYzM3NTliNyIsIm5iZiI6MTcyNDEyNDIzNi45MzMyNzksInN1YiI6IjY2YzQwYjI2ZjVlZWU1ZjdlOTc1ZjY1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NcBSvT1OZkbJ1qEOtPBkot8dVcyL-eSaLjWm0O-fR68",
    },
  }).then(async (res) => {
    // console.log({ res });
    const data = await res.json();
    console.log({ data });
    response = data;
  });

  console.log(response)

  code chạy từ trên xuống dưới

  B1: tạo ra response 1 object rỗng
  B2: call api
  B3: call thành công gán data vào response - "Bắt đầu sai ở đây"

  Trong React "1 component" được re-render lại khi nào? - thứ 1 khi ta dùng state để lưu trữ dữ liệu và ta dùng 1 hàm để ta set lại State đó - cách này gọi setter function - lúc này nó mới trigger và render lại function

  Cái sai ở đây là ta đang cập nhật dữ liệu - nhưng không có tạo ra 1 trigger để component re-render "không gây ra việc gọi lại function cụ thể không render lại component"


  Để khắc phục cách này ta sử dụng Side Effect
*/
