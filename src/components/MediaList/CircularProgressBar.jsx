const CircularProgressBar = ({
  percent = 38,
  size = 3,
  strokeWidth = 0.25,
}) => {
  const radius = size / 2 - strokeWidth;

  return (
    <div>
      <svg width={`${size}vw`} height={`${size}vw`}>
        <circle
          r={`${radius}vw`}
          // fill="red"
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          stroke="white"
          strokeWidth={`${strokeWidth}vw`}
        />
        <circle
          r={`${radius}vw`}
          // fill="red"
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          stroke="green"
          strokeWidth={`${strokeWidth}vw`}
          strokeDasharray={`${2 * Math.PI * radius}vw`}
          strokeDashoffset={`${
            2 * Math.PI * radius - (percent / 100) * 2 * Math.PI * radius
          }vw`}
          transform="rotate(-90)"
          style={{ transformOrigin: "center" }}
          strokeLinecap="round"
          fill="none"
        />
        <text
          x={`${size / 2}vw`}
          y={`${size / 2}vw`}
          fill="white"
          fontSize="1.2vw"
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          {percent}
        </text>
      </svg>
    </div>
  );
};
export default CircularProgressBar;

/*
Học cách tạo svg

Muốn có hình tròn circle
r: bán kính
cx và cy giúp kéo hình tròn ra tâm
stroke="white" viền màu trắng
strokeWidth="5px" độ dày viền 5px
*/
