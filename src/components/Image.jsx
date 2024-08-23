import { useEffect, useState } from "react";

const ImageComponent = (props) => {
  const { src, width, height, className } = props;
  // Làm sao để biết cái ảnh đang được load - sử dụng Javascript
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  //

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
    };

    return () => {
      // clean up function
      img.onload = null; // huỷ bỏ event handler trước đó nếu có
    };
  }, [src]);

  // useEffect sẽ chạy như sau
  /*
    Chạy từ trên xuống dưới - bỏ qua useEffect - sau khi khối code jsx xong bắt đầu chạy useEffect

    Lần chạy đầu tiên useEffect sẽ chạy callback trước - set lại dữ liệu, 

    Nếu có đối số trong dependencies thì khi dữ liệu đó thay đổi thì hàm useEffect sẽ chạy lại callback

    - cái callback nó cung cấp cái gọi là clean up function trả về 1 callback 

    - khi ImageComponent render - chạy cleanup function trước - sau đấy thực thì callback function "Tham số đầu tiên useEffect" 
    - khi có sự thay đổi của dependencies - thì việc đầu tiên chạy clean up function trước sau đó thực thi callback function
  */

  return (
    <img
      // className="w-full rounded-lg blur-md"
      className={currentSrc === src ? className : `${className} blur-md`}
      src={currentSrc}
      alt=""
      width={width}
      height={height}
    />
  );
};
export default ImageComponent;
