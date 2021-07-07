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

      <rect
        x={x} 
        y={y - 30}
        width={bandwidth} 
        height={30} 
        fill= { dispalyValue ? "#222222" : "#00000000"}
      />

      <text 
        x={x + bandwidth * 0.5} 
        y={y - 7}
        fill= { dispalyValue ? color : "#00000000"}
        fontSize="22"
        style={{ textAnchor: 'middle'}}>
        {value}
      </text>

    </>
  )
}

