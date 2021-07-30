import { React, useState } from "react";

export const Bar = ({ value, x, y, height, bandwidth, color, onHover, index }) => {

  const [dispalyValue, setDisplayValue] = useState(false); 

  const onMouseEnter = () => {
    setDisplayValue(true)
    onHover(true, index)
  }

  const onMouseLeave = () => {
    setDisplayValue(false)
    onHover(false, index)

  }

  return (
    <>
      <rect onMouseEnter={() => onMouseEnter()} onMouseLeave={() => onMouseLeave()}
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
        fill= { dispalyValue ? "#555555" : "#00000000" }
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

