import React from 'react'

interface ScatterPlotProps {
  params: any
  model: string
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ params, model }) => {
  const points = []

  // Create a 25x25 grid of points spanning (-1, 1) in x and y
  const gridSize = 25
  for (let i = 0; i <= gridSize; i++) {
    for (let j = 0; j <= gridSize; j++) {
      const x = -1 + (2 * i) / gridSize
      const y = -1 + (2 * j) / gridSize
      points.push({ x, y })
    }
  }

  // Apply distortion based on the selected model and parameters
  const applyDistortion = (x: number, y: number) => {
    if (model === 'plumbBob') {
      const r2 = x * x + y * y
      const k1 = params.d1
      const k2 = params.d2
      const p1 = params.d3
      const p2 = params.d4
      const k3 = params.d5

      const distortedX = x * (1 + k1 * r2 + k2 * r2 * r2 + k3 * r2 * r2 * r2) + 2 * p1 * x * y + p2 * (r2 + 2 * x * x)
      const distortedY = y * (1 + k1 * r2 + k2 * r2 * r2 + k3 * r2 * r2 * r2) + p1 * (r2 + 2 * y * y) + 2 * p2 * x * y

      return { x: distortedX, y: distortedY }
    } else if (model === 'fisheye') {
      const r = Math.sqrt(x * x + y * y)
      if (r === 0) return { x, y }

      const theta = Math.atan(r)
      const thetaD = theta * (1 + params.d1 * theta * theta + params.d2 * theta * theta * theta * theta + params.d3 * theta * theta * theta * theta * theta * theta + params.d4 * theta * theta * theta * theta * theta * theta * theta * theta)

      const distortedX = (thetaD / r) * x
      const distortedY = (thetaD / r) * y

      return { x: distortedX, y: distortedY }
    }
    return { x, y }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 border border-gray-300">
      <svg viewBox="-1.1 -1.1 2.2 2.2" className="w-full h-full">
        {/* <text x="-1" y="-1.05" fontSize="0.05" fill="black">
          Model: {model}
        </text>
        <text x="-1" y="-1" fontSize="0.05" fill="black">
          Params: {JSON.stringify(params)}
        </text> */}
        {points.map((point, index) => {
          const distortedPoint = applyDistortion(point.x, point.y)
          return (
            <circle key={index} cx={distortedPoint.x} cy={distortedPoint.y} r="0.01" fill="blue" />
          )
        })}
      </svg>
    </div>
  )
}

export default ScatterPlot
