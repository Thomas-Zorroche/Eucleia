import { React, useState, useEffect } from "react";
import { csvParse, scaleBand, scaleLinear } from 'd3';

import { Bar } from './Bar';
import { getOccurencesInArray, monthNames } from "../../common/common";
import { EDateFilter } from "../ui/Footer";

/* CONSTANTS PARAMETERS */
const margin = { top:50, right:40, bottom:50, left:70 };
const innerPadding = 0.4; // padding between bars
/* ---------------------------------------------------------- */

// Round maxValue up to the nearest 10
const getMaxValue = (data) => {
  const maxValue = Math.max(...data) // max value from data
  return Math.round(((maxValue / 10) + 0) * 10);
} 

// Bar Chart Object
export const BarChart = ({ width, height, dataX, dataY, onTransferHover, dateFilter, colorizeType }) => {
  const [yValues, setYValues] = useState(dataY);
  const [maxValueY, setMaxYValue] = useState(getMaxValue(dataY));
  const [xValues, setXValues] = useState(dataX) 

  const [domainX, setDomainX] = useState([])
  const [colorizeByType, setColorizeByType] = useState(false)

  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.left - margin.right;

  const xScale = scaleBand()
    .domain(domainX)
    .range([-1, innerWidth])  // -1 --> display transfer for first day of month
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

  useEffect(() => {
    if (dateFilter.type === EDateFilter.MONTH)
    {
      setDomainX(Array(31).fill().map((d, i) => {
        return (i + 1) < 10 ? dateFilter.value + "-0" + (i + 1) : dateFilter.value + "-" + (i + 1)
      }))
    }
    else if (dateFilter.type === EDateFilter.YEAR)
    {
      setDomainX(monthNames)
    }
    else {
      console.error("Invalid date filter.")
    }
    
  }, [dateFilter])

  useEffect(() => {
    setColorizeByType(colorizeType);
  }, [colorizeType])
  
  const onBarHover = (hover, index) => {
    onTransferHover(hover, index);
  }

  return (
    <div style={{cursor: "crosshair"}}>
      <svg height={height} width={width}>
        <rect width="100%" height="100%" fill={"var(--blueBody)"} rx="15" ry="15" />      
        <g transform={`translate(${margin.left}, ${margin.top})`}>

          {dataX.length === 0 && <text fill="white" x={(width/2) - 150} y={(height/2) - 100} >NO DATA</text>}

          {yScale.ticks().map((tickValue) => 
            <g key={tickValue}>
              <text x={-25} y={yScale(tickValue) + 3} fontSize="15" fill="white" style={{ textAnchor: 'end'}}>{tickValue}</text>
              <line 
                x1={-10} 
                y1={yScale(tickValue)}
                x2={innerWidth}
                y2={yScale(tickValue)}
                stroke="var(--blueTypo)"
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
                {dateFilter.type === EDateFilter.MONTH ? tickValue.substring(8, 10) : tickValue}
              </text>
          )}

          {yValues.map((data, index) => {
            if (!xScale(xValues[index]))
              return "";

            // We count occurences of the same date in order to display transfer correctly
            // {count: , index: }
            const dateOccurences = getOccurencesInArray(index, xValues)
            if (dateOccurences.count === 0) return 0;
            
            const bandwidth = xScale.bandwidth() / dateOccurences.count;
            const x = dateOccurences.count === 1 ? xScale(xValues[index]) : xScale(xValues[index]) + (dateOccurences.index * (1.1 * bandwidth))
            
            return (
              <Bar 
                key={index}
                index={index}
                value={data.value}
                x = {x}
                y={yScale(data.value)}
                height={innerHeight - yScale(data.value)}
                bandwidth={bandwidth}
                color={colorizeByType ? data.color : data.userColor}
                onHover={onBarHover}
              />
            )
          })}

        </g>
      </svg>
  </div>
  );

}

