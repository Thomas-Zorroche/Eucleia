import './App.css';
import './style/component.css';
import './style/style.css';

import { MenuBar, EMenu } from './components/ui/MenuBar'
import { BarChart } from './components/d3/BarChart'

import { React, useEffect, useState } from 'react'

const dataX1 = [ 
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre"
];

const dataY1 = [ 
  800, 
  750, 
  222,
  550,
  119,
  31,
  112,
  551,
  496 
];

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

function App() {

  const [dataX, setDataX] = useState(dataX1);
  const [dataY, setDataY] = useState(dataY1);

  const [activeMenu, setActiveMenu] = useState(EMenu.ACCEUIL);

  useEffect(() => {
    async function loadData()
    {
      const dates = await queryDatabase("dates");
      const values = await queryDatabase("values");

      const data = dates.map((date, index) => ({date:[date], value:values[index]}));

      console.log(sortByDates(data))

      setDataX(data.map(obj => obj.date));
      setDataY(data.map(obj => parseInt(obj.value)));
    }
    loadData();
  }, [])

  const changeMenu = (menu) => {
    setActiveMenu(menu)
  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>{activeMenu}</h1>

        <MenuBar onMenuChanged={changeMenu} />

        <BarChart
          width={750}
          height={300} 
          dataX={dataX} 
          dataY={dataY} 
        />

      </header>
    </div>
  );
}

export default App;
