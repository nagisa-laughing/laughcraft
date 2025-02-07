import { line, scaleLinear } from 'd3'

const ANGLE_NUMBER = 7
const MAX_NUMBER = 5

const result = [5, 4, 5, 4, 3, 3, 3]

// gridラインの二次元配列を生成している[[1,1,1,1,1,1],[2,2,2,2,2,2]...]など
const gridPoints = Array.from({ length: MAX_NUMBER }, (_, i) =>
  Array.from({ length: ANGLE_NUMBER }, () => i + 1)
)

const labels = [
  'Frontend',
  'Design',
  'Backend',
  'Database',
  'Infrastructure',
  'Management',
  'Mobile App',
]

export const RaderChart = ({ width = 600 }: { width: number }) => {
  const rScale = scaleLinear()
    .domain([0, MAX_NUMBER])
    .range([0, Math.max(0, width / 2 - 30)])

  const x = (value: number, index: number) =>
    Math.max(
      0,
      rScale(value) * Math.cos(((2 * Math.PI) / ANGLE_NUMBER) * index - Math.PI / 2) + width / 2
    )
  const y = (value: number, index: number) =>
    Math.max(
      0,
      rScale(value) * Math.sin(((2 * Math.PI) / ANGLE_NUMBER) * index - Math.PI / 2) + width / 2
    )

  const getLine = line<number>()
    .x((d, i) => x(d, i))
    .y((d, i) => y(d, i))

  return (
    <svg width={Math.max(0, width)} height={Math.max(0, width)} className="ease-in-animation">
      <g>
        {gridPoints.map((grid, i) => (
          <path
            key={i}
            fill="none"
            stroke="#a9a9a9"
            strokeDasharray="4 2"
            strokeWidth="1"
            className="fill-none"
            d={`${getLine(grid)} z`}
          />
        ))}
        {labels.map((label, i) => (
          <text key={label} fontSize="15px" x={x(MAX_NUMBER, i) - 30} y={y(MAX_NUMBER, i) - 10}>
            {label}
          </text>
        ))}
        <path
          fill="#F2690D"
          fillOpacity={0.3}
          stroke="#F2690D"
          strokeWidth="1"
          d={`${getLine(result)} z`}
        />
      </g>
    </svg>
  )
}
