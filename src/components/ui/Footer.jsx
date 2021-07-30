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

// const getArrayOfUserColors = (usersDatas) => {
//   const users = []
//   for (const [key, value] of usersDatas.entries())
//     users.push({pseudo: key, colors: value})
  
//   return users;
// }

export const Footer = ({ onDateFilterChange, onUserFilterChange, usersDatas }) => {

  //const userColors = getArrayOfUserColors(usersDatas);

  const [dateFilter, setDateFilter] = useState({type: EDateFilter.MONTH, value:""})

  const updateDateFilter = (e) => {
    let filterString = e.target.value;

    if (filterString === "Year")
      setDateFilter({...dateFilter, type: EDateFilter.YEAR})

    else if (filterString === "Month")
      setDateFilter({...dateFilter, type: EDateFilter.MONTH})
  }

  const onSpinBoxValueChange = (newValue) => {
    setDateFilter({...dateFilter, value: newValue})
  }

  useEffect(() => {
    onDateFilterChange(dateFilter);
  }, [dateFilter])

  const onFilterUserCircleChange = (newUserFilter, userIndex) => {
    onUserFilterChange(newUserFilter, userIndex)
  }

  return (
    <div id="Footer" style={{display: JSON.parse(sessionStorage.getItem("isLogin")) || false ? "flex" : "none"}}>
      <SpinBox type={ESpinBoxType.MONTH} onValueChange={onSpinBoxValueChange} />

      <select name="date_option"  onClick={(e) => updateDateFilter(e)}>
              <option value="Year">Année</option>
              <option value="Month">Mois</option>
      </select>

      {usersDatas.map((user, index) => {
        return <FilterUserCircle index={index} pseudo={user.pseudo} colors={user.colors} onUserFilterChange={onFilterUserCircleChange}/>
      })}

    </div>
  );
};