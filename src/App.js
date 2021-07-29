import './App.css';
import './style/component.css';
import './style/style.css';

import { React, useEffect, useState } from 'react'

import { MenuBar } from './components/ui/MenuBar'
import { HeaderBar } from './components/ui/HeaderBar'
import { Main } from './components/Main'
import { EDateFilter, Footer } from './components/ui/Footer';

import { getColorVariants } from "./common/colors.js"


async function queryDatabase(query) {
  const response = await fetch("http://localhost/Eucleia/api/eucleia/?q=" + query, {
    method: "GET"
  });
  const json = await response.json();
  return json;
}

function App() {

  // Map of datas ["Pseudo" --> mainColor]  
  const [usersDatas, setUsersDatas] = useState(new Map())
  // Type of Filter and value
  const [dateFilter, setDateFilter] = useState({type: EDateFilter.MONTH, value:""})

  useEffect(() => {
    async function loadUsersDatas()
    {
      const usersDatasRaw = await queryDatabase("usersDatas"); // only pseudo and main color

      const usersMap = new Map();
      usersDatasRaw.map(user => {
        usersMap.set(user.pseudo, getColorVariants(user.color))
      })
      setUsersDatas(usersMap)
    }

    loadUsersDatas();
  }, [])

  const onDateFilterChange = (newFilter) => {
    setDateFilter(newFilter)
  }

  return (
    <div className="App">

      <HeaderBar />
      
      <div id="Container-App">
        <MenuBar />
        <Main usersDatas={usersDatas} dateFilter={dateFilter} />
      </div>

      <Footer onDateFilterChange={onDateFilterChange}/>

    </div>
  );
}

export default App;
