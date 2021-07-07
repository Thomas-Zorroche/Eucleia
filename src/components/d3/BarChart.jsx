import { React, useState, useEffect } from "react";
import { scaleBand, scaleLinear } from 'd3';

import { Bar } from './Bar';

const width = 700;
const height = 450;
const margin = { top:50, right:50, bottom:50, left:70 };

const innerPadding = 0.25; // padding between bars

// Round maxValue up to the nearest 10
const getMaxValue = (data) => {
  const maxValue = Math.max(...data) // max value from data
  return Math.round(((maxValue / 10) + 0) * 10);
}

// Bar Chart Object
const BarChart = ({ dataX, dataY }) => {
  const [yValues, setData] = useState(dataY);
  const [maxValueY, setMaxValueY] = useState(getMaxValue(dataY));
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

  return (
    <div>
      <svg height={height} width={width}>
        <rect width="100%" height="100%" fill="white" />      
        <g transform={`translate(${margin.left}, ${margin.top})`}>

          {yScale.ticks().map((tickValue) => 
            <g>
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
            x={xScale(tickValue) + xScale.bandwidth() * 0.5} 
            y={innerHeight + 30} 
            fontSize="15" 
            style={{ textAnchor: 'middle'}}>
              {tickValue}
            </text>
          )}

          {yValues.map((value, index) => 
            <Bar 
              value={value}
              x={xScale(xValues[index])}
              y={yScale(value)}
              height={innerHeight - yScale(value)}
              bandwidth={xScale.bandwidth()}
              color={"#a745f5"}
            />
          )}

        </g>
      </svg>
  </div>
  );

}

export default BarChart;