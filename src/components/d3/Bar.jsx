import { React, useState, useEffect } from "react";
import { scaleBand, scaleLinear } from 'd3';

export const Bar = ({ value, x, y, height, bandwidth, color }) => {

  const [dispalyValue, setDisplayValue] = useState(false);

  return (
    <>
      <rect onMouseEnter={() => setDisplayValue(true)} onMouseLeave={() => setDisplayValue(false)}
        x={x} 
        y={y} 
        width={bandwidth} 
        height={height} 
        fill={color} 
      />

      <text 
        x={x + bandwidth * 0.2} 
        y={y - 10}
        fill= { dispalyValue ? color : "#00000000"}>
        {value}
      </text>

    </>
  )
}

