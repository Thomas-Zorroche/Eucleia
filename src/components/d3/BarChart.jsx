import { React, useState, useEffect } from "react";
import { scaleBand, scaleLinear } from 'd3';

import { Bar } from './Bar';

/* CONSTANTS PARAMETERS */
const margin = { top:50, right:40, bottom:50, left:70 };
const innerPadding = 0.5; // padding between bars
/* ---------------------------------------------------------- */

// Round maxValue up to the nearest 10
const getMaxValue = (data) => {
  const maxValue = Math.max(...data) // max value from data
  return Math.round(((maxValue / 10) + 0) * 10);
} 

// Bar Chart Object
export const BarChart = ({ width, height, dataX, dataY }) => {
  const [yValues, setYValues] = useState(dataY);
  const [maxValueY, setMaxYValue] = useState(getMaxValue(dataY));
  const [xValues, setXValues] = useState(dataX) 

  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleBand()
    .domain(xValues)
    .range([0, innerWidth])
    .paddingInner(innerPadding);

  const yScale = scaleLinear()
    .domain([0, maxValueY])
    .range([innerHeight, 0]);

  // Update x and y values
  useEffect(() => {
    setYValues(dataY)
    setMaxYValue(getMaxValue(dataY))
  }, [dataY])
  
  useEffect(() => {
    setXValues(dataX)
  }, [dataX])

  return (
    <div>
      <svg height={height} width={width}>
        <rect width="100%" height="100%" fill="#333333" />      
        <g transform={`translate(${margin.left}, ${margin.top})`}>

          {yScale.ticks().map((tickValue) => 
            <g key={tickValue}>
              <text x={-25} y={yScale(tickValue) + 3} fontSize="15" style={{ textAnchor: 'end'}}>{tickValue}</text>
              <line 
                x1={-10} 
                y1={yScale(tickValue)}
                x2={innerWidth}
                y2={yScale(tickValue)}
                stroke="black"
              />
            </g>
          )}

          {xScale.domain().map((tickValue) =>
            <text 
              key={tickValue}
              x={xScale(tickValue) + xScale.bandwidth() * 0.5} 
              y={innerHeight + 30} 
              fontSize="15" 
              style={{ textAnchor: 'middle'}}>
              {tickValue}
            </text>
          )}

          {yValues.map((value, index) => 
            <Bar 
              key={index}
              value={value}
              x = {xScale(xValues[index]) || 0}
              y={yScale(value)}
              height={innerHeight - yScale(value)}
              bandwidth={xScale.bandwidth()}
              color={sessionStorage.getItem("userColor")}
            />
          )}

        </g>
      </svg>
  </div>
  );

}

