import { React, useState, useEffect } from "react";
import { csvParse, scaleBand, scaleLinear } from 'd3';

import { Bar } from './Bar';
import { getOccurencesInArray } from "../../common/common";

/* CONSTANTS PARAMETERS */
const margin = { top:50, right:40, bottom:50, left:70 };
const innerPadding = 0.6; // padding between bars
/* ---------------------------------------------------------- */

// Round maxValue up to the nearest 10
const getMaxValue = (data) => {
  const maxValue = Math.max(...data) // max value from data
  return Math.round(((maxValue / 10) + 0) * 10);
} 

// Bar Chart Object
export const BarChart = ({ width, height, dataX, dataY, backgroundColor }) => {
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


  useEffect(() => {
    setYValues(dataY)
    setMaxYValue(getMaxValue(dataY.map(d => d.value)))
  }, [dataY])
  
  useEffect(() => {
    setXValues(dataX)
  }, [dataX])

  return (
    <div>
      <svg height={height} width={width}>
        <rect width="100%" height="100%" fill={backgroundColor} rx="15" ry="15" />      
        <g transform={`translate(${margin.left}, ${margin.top})`}>

          {yScale.ticks().map((tickValue) => 
            <g key={tickValue}>
              <text x={-25} y={yScale(tickValue) + 3} fontSize="15" fill="white" style={{ textAnchor: 'end'}}>{tickValue}</text>
              <line 
                x1={-10} 
                y1={yScale(tickValue)}
                x2={innerWidth}
                y2={yScale(tickValue)}
                stroke="white"
              />
            </g>
          )}

          {xScale.domain().map((tickValue) =>
              <text 
                key={tickValue}
                x={xScale(tickValue) + xScale.bandwidth() * 0.5} 
                y={innerHeight + 30} 
                fontSize="15" 
                fill="white"
                style={{ textAnchor: 'middle'}}>
                {tickValue}
              </text>
          )}

          {yValues.map((data, index) => {
            // We count occurences of the same date in order to display transfer correctly
            // {count: , index: }
            const dateOccurences = getOccurencesInArray(index, xValues)
            if (dateOccurences.count === 0) return 0;
            
            const bandwidth = xScale.bandwidth() / dateOccurences.count;
            // xValues[index] == YYYY-MM-DD
            const x = dateOccurences === 1 ? xScale(xValues[index]) : xScale(xValues[index]) + (dateOccurences.index * (1.1 * bandwidth))
            
            return (
              <Bar 
                key={index}
                value={data.value}
                x = {x}
                y={yScale(data.value)}
                height={innerHeight - yScale(data.value)}
                bandwidth={bandwidth}
                color={data.color}
              />
            )
          })}



        </g>
      </svg>
  </div>
  );

}

