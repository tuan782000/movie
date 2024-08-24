import ImageComponent from "@components/Image";

const ActorInfo = (props) => {
  const { id, name, character, profilePath, episodeCount } = props;
  console.log(id);
  return (
    <div className="rounded-lg border border-slate-300 bg-black shadow-sm">
      <ImageComponent
        className={`w-full rounded-lg`}
        src={
          profilePath
            ? `https://image.tmdb.org/t/p/w276_and_h350_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        width={276}
        height={350}
      />
      {/* <img
        className="w-full rounded-lg"
        src={
          profilePath
            ? `https://image.tmdb.org/t/p/w276_and_h350_face${profilePath}`
            : "/ActorNoImage.svg"
        }
        alt=""
        width={276}
        height={350}
      /> */}
      <div className="p-3">
        <p className="font-bold">{name}</p>
        <p>{character}</p>
        <p>
          {episodeCount} {episodeCount === 1 ? "Episode" : "Episodes"}
        </p>
      </div>
    </div>
  );
};
export default ActorInfo;

/*
Bên này cũng vậy

cải thiện UX hiển thị ảnh thêm w-full và thêm width height cho nó


*/
