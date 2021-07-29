/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
import '../../style/component.css';

import { ESpinBoxType, SpinBox } from './SpinBox';

export const EDateFilter = {
  YEAR: "Year",
  MONTH: "Month",
  WEEK: "Week"
}


export const Footer = ({ onDateFilterChange }) => {

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
  })

  return (
    <div id="Footer">
      <SpinBox type={ESpinBoxType.MONTH} onValueChange={onSpinBoxValueChange} />

      <select name="date_option"  onClick={(e) => updateDateFilter(e)}>
              <option value="Year">Année</option>
              <option value="Month">Mois</option>
      </select>

    </div>
  );
};