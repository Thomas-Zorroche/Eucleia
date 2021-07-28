import { React, useState, useEffect } from 'react';

import { BarChart } from '../components/d3/BarChart';

async function queryDatabase(query) {
  const response = await fetch("http://localhost/Eucleia/api/eucleia/?q=" + query, {
    method: "GET"
  });
  const json = await response.json();
  return json;
}
const sortByDates = (data) => {
  return data.sort(function (a,b) {
    return new Date(a.date) - new Date(b.date);
  })
}

export const GraphiquePage = () => {
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);

  useEffect(() => {
    async function loadData()
    {
      const dates = await queryDatabase("dates");
      const values = await queryDatabase("values");

      const data = dates.map((date, index) => ({date:[date], value:values[index]}));

      sortByDates(data);

      setDataX(data.map(obj => obj.date));
      setDataY(data.map(obj => parseInt(obj.value)));
    }
    loadData();
  }, [])

  return (
    <div id="Page">
        <h1>Graphiques</h1>

        <BarChart
          width={1500}
          height={750} 
          dataX={dataX} 
          dataY={dataY} 
      />
    </div>
  )
}