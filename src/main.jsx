import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./pages/HomePage.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";

// sử dụng method createBrowserRouter của react-router-dom gán vào bên trong router
// Định nghĩa bên trong là 1 array
// Phần tử đầu tiên là object - cấu hình nó là trang chủ luôn - path: '/', là trang home page
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/movie",
    element: <MovieDetail />,
  },
]);

// router này nó giống như 1 contextAPI - và router nó là props truyền router đã tạo ở trên và thế là dùng được

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
);
