import Header from "./components/Header";
import FeatureMovie from "./components/FeatureMovie";
import MediaList from "./components/MediaList";

const App = () => {
  return (
    <div>
      <Header />
      <FeatureMovie />
      <MediaList />
    </div>
  );
};
export default App;

/*
 Giờ đây code của ta sau khi chia tách component đã dễ nhìn hơn rất nhiều

 Tách ra Header

 Riêng FeatureMovie nó sẽ được đặt trong folder FeatureMovie và index sẽ là component chính ngoài ra có các component có sẽ được đặt trong index đó
 - Movie đóng vai trò sẽ hiển thị img và các nội dung
 - PaginateIndicator đảm nhận tính năng slide

 Kinh nghiệm cho dự án thực tê: Build xong Markup trước - sau đó tách nhỏ ra từ từ - sau đó gọi api hiển thị các dữ liệu thực tế
*/
