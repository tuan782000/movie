import ActorInfo from "@components/MediaDetail/ActorInfo";
import { useState } from "react";

const ActorList = (props) => {
  const { actors = [] } = props;
  const [isShowMore, setIsShowMore] = useState(false);
  const currentActors = isShowMore ? actors.slice(0, 32) : actors.slice(0, 4);
  // Tại sao không lưu currentActors trong state. Lý do actors là dữ liệu được truyền từ bên ngoài - được tính toán
  console.log(currentActors);
  return (
    <div>
      <p className="mb-4 text-[1.4vw] font-bold">Actors:</p>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {/*        
        {actors.map((actor) => (
          <ActorInfo
            key={actor.id}
            id={actor.id}
            name={actor.name}
            character={actor.character}
            profilePath={actor.profile_path}
          />
        ))} */}
        {/* Thay vì actor vì muốn giới hạn lấy ra 4 người nên currentActors giới hạn */}
        {currentActors.map((actor) => (
          <ActorInfo
            key={actor.id}
            id={actor.id}
            name={actor.name}
            character={actor.character}
            profilePath={actor.profile_path}
          />
        ))}
      </div>
      <p
        className="mt-1 cursor-pointer"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? "Show Less" : "Show More"}
      </p>
    </div>
  );
};
export default ActorList;
