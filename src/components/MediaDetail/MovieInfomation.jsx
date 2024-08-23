import { currencyFormatter } from "@libs/utils";

const MovieInfomation = (props) => {
  const { movieInfo = {} } = props;
  // country thì 1 bộ phim có thể có nhiều nước tham gia sản xuất - cho nên country trả về mảng
  // original_country nó là mảng - nhưng nếu trả về undefined - phòng thờ thì nên để [] tránh bị undefined
  return (
    <div className="">
      <p className="mb-4 text-[1.4vw] font-bold">Infomation</p>

      <div className="mb-4">
        <p className="font-bold">Original Name</p>
        <p>{movieInfo.original_title}</p>
      </div>

      <div className="mb-4">
        <p className="font-bold">Original Country</p>
        {(movieInfo.origin_country || []).map((countryCode) => (
          <img
            key={countryCode}
            src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
            className="mr-1 mt-1 w-[1.4vw]"
          />
        ))}
      </div>

      <div className="mb-4">
        <p className="font-bold">Status</p>
        <p>{movieInfo.status}</p>
      </div>

      <div className="mb-4">
        <p className="font-bold">Budget</p>
        <p>{currencyFormatter(movieInfo.budget)}</p>
      </div>

      <div className="mb-4">
        <p className="font-bold">Revenue</p>
        <p>{currencyFormatter(movieInfo.revenue)}</p>
      </div>
    </div>
  );
};
export default MovieInfomation;
