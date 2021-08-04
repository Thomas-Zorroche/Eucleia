/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
import '../../style/component.css';

import { ESpinBoxType, SpinBox } from './SpinBox';
import { FilterUserCircle } from './FilterUserCircle';

export const EDateFilter = {
  YEAR: "Year",
  MONTH: "Month",
  WEEK: "Week"
}

export const Footer = ({ onDateFilterChange, onUserFilterChange, onShowExpansesChanged, usersDatas }) => {

  const [dateFilter, setDateFilter] = useState({type: EDateFilter.MONTH, value:""})
  // Whether it displays expanses or incomes (default: expanses)
  const [showExpanses, setShowExpanses] = useState(true)

  const updateDateFilter = (e) => {
    let filterString = e.target.value;

    if (filterString === "Year")
      setDateFilter({...dateFilter, type: EDateFilter.YEAR})

    else if (filterString === "Month")
      setDateFilter({...dateFilter, type: EDateFilter.MONTH})
  }
  
  useEffect(() => {
    onDateFilterChange(dateFilter);
  }, [dateFilter])

  const onSpinBoxValueChange = (newValue) => {
    setDateFilter({...dateFilter, value: newValue})
  }
  
  const onFilterUserCircleChange = (newUserFilter, userIndex) => {
    onUserFilterChange(newUserFilter, userIndex)
  }
  
  const updateShowExpanses = (e) => {
    setShowExpanses(e.target.value === "expanses")
  }
  useEffect(() => {
    onShowExpansesChanged(showExpanses);
  }, [showExpanses])

  return (
    <div id="Footer" style={{display: JSON.parse(sessionStorage.getItem("isLogin")) || false ? "flex" : "none"}}>
      <SpinBox type={dateFilter.type} onValueChange={onSpinBoxValueChange} />

      <select name="date_option" onClick={(e) => updateDateFilter(e)}>
              <option value="Month">Mois</option>
              <option value="Year">Année</option>
      </select>

      <select name="showExpanses" onClick={(e) => updateShowExpanses(e)}>
              <option value="expanses">Dépenses</option>
              <option value="incomes">Revenus</option>
      </select>

      {usersDatas.map((user, index) => {
        return <FilterUserCircle index={index} pseudo={user.pseudo} filterInit={user.userFilter} colors={user.colors} onUserFilterChange={onFilterUserCircleChange}/>
      })}

    </div>
  );
};