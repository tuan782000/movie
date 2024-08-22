import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <p>Footer</p> */}
    </div>
  );
};
export default RootLayout;

/*
Nơi này sẽ là nơi chứa những layout sử dụng chung - có tính tái sử dụng ở nhiều nơi

Outlet là những cái HomePage và MovieDetail,... - những component mà sẽ sử dụng root layout
*/
