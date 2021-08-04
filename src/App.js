import './App.css';
import './style/component.css';
import './style/style.css';

import { React, useEffect, useState } from 'react'

import { MenuBar } from './components/ui/MenuBar'
import { BalanceHeader } from './components/ui/BalanceHeader'
import { Main } from './components/Main'
import { EDateFilter, Footer } from './components/ui/Footer';

import { getColorVariants } from "./common/colors.js"
import { EFilterUser } from './components/ui/FilterUserCircle';
import { getUserIndexByPseudo } from './common/common';
import { contourDensity } from 'd3';


async function queryDatabase(query) {
  const response = await fetch("http://localhost/Eucleia/api/eucleia/?q=" + query, {
    method: "GET"
  });
  const json = await response.json();
  return json;
}

function App() {

  // Array of objects containing all user datas { pseudo, { colors }, userFilter }
  const [usersDatas, setUsersDatas] = useState([])
  // Type of Filter and value for Date
  const [dateFilter, setDateFilter] = useState({type: EDateFilter.MONTH, value:""})
  // Whether it displays expanses or incomes (default: expanses)
  const [showExpanses, setShowExpanses] = useState(true)


  useEffect(() => {
    async function loadUsersDatas()
    {
      const usersDatasRaw = await queryDatabase("usersDatas"); // only pseudo and main color

      const usersDatasPrepare = usersDatasRaw.map(user => {
        return { 
          pseudo: user.pseudo, 
          colors: getColorVariants(user.color), 
          userFilter: sessionStorage.getItem("userConnected") === user.pseudo ?  EFilterUser.ALL : EFilterUser.NONE }
      })
      setUsersDatas(usersDatasPrepare)
    }

    loadUsersDatas();
  }, [])

  const onDateFilterChange = (newFilter) => {
    setDateFilter(newFilter)
  }

  const onUserFilterChange = (newUserFilter, userIndex) => {

    setUsersDatas(usersDatas.map((user, index) => {
      if (index === userIndex)
        return {...user, userFilter: newUserFilter}
      else
        return user;
    }))
  }

  const onShowExpansesChanged = (showExpanses_) => {
    setShowExpanses(showExpanses_);
  }

  return (
    <div className="App">

      <BalanceHeader dateFilter={dateFilter} />
      
      <div id="Container-App">
        <MenuBar />
        <Main 
          usersDatas={usersDatas} 
          dateFilter={dateFilter}
          showExpanses={showExpanses} />
      </div>

      <Footer 
        onDateFilterChange={onDateFilterChange} 
        onUserFilterChange={onUserFilterChange} 
        onShowExpansesChanged={onShowExpansesChanged}
        usersDatas={usersDatas}/>

    </div>
  );
}

export default App;
