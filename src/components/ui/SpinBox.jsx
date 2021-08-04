import { render } from '@testing-library/react';
import { index } from 'd3';
import { React, useEffect, useState } from 'react';
import '../../style/component.css';

import nextIcon from "./../../img/next.svg"
import previousIcon from "./../../img/previous.svg"


const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
const years = ["2020", "2021", "2022"];

export const ESpinBoxType = {
  NUMBER: "Number",
  MONTH: "Month",
  YEAR: "Year"
}


export const SpinBox = ({ type, onValueChange }) => {
  
  // Value
  const [value, setValue] = useState(0)
  // Display String of value
  const [stringValue, setStringValue] = useState("0")
  // Year of month filter
  const [yearOfMonth, setYearOfMonth] = useState(2021)

  useEffect(() => {
    if (type === ESpinBoxType.MONTH)
    {
      const date = new Date();
      const currentIndexMonth = date.getMonth();

      setValue(currentIndexMonth);
      setStringValue(months[currentIndexMonth] + " 2021");
      setYearOfMonth(date.getFullYear())
    }
    else if (type === ESpinBoxType.YEAR)
    {
      const date = new Date();
      const currentYear = date.getFullYear();

      setValue(currentYear);
      setStringValue(currentYear);
    }
    else if (type === ESpinBoxType.NUMBER)
    {
      setValue(0);
      setStringValue("0");
    }
  }, [type])

  useEffect(() => {
    let newValue;
    if (type === ESpinBoxType.MONTH)
    {
      newValue = (value + 1) < 10 ?  yearOfMonth + "-0" + (value + 1) : yearOfMonth + "-" + (value + 1);
    }
    else if (type === ESpinBoxType.YEAR)
    {
      newValue = value.toString();
    }
    else if (type === ESpinBoxType.NUMBER)
    {
      newValue = value;
    }
    onValueChange(newValue);
  }, [value])

  const updateValueNeg = () => {
    if (type === ESpinBoxType.MONTH)
    {
      // Next Year
      if (value <= 0) {
        setValue(11)
        setYearOfMonth(yearOfMonth - 1);
        setStringValue(months[11] + " " + (yearOfMonth - 1))
      }
      // Current Year
      else {
        setValue(value - 1)
        setStringValue(months[value - 1] + " " + yearOfMonth)
      }
    }
    if (type === ESpinBoxType.NUMBER || type === ESpinBoxType.YEAR)
    {
      setValue(value - 1)
      setStringValue((value - 1))
    }
  }

  const updateValuePos = () => {
    if (type === ESpinBoxType.MONTH)
    {
      // Next Year
      if (value >= 11) {
        setValue(0)
        setYearOfMonth(yearOfMonth + 1);
        setStringValue(months[0] + " " + (yearOfMonth + 1))
      }
      // Current Year
      else {
        setValue(value + 1)
        setStringValue(months[value + 1] + " " + yearOfMonth)
      }
    }
    if (type === ESpinBoxType.NUMBER || type === ESpinBoxType.YEAR)
    {
      setValue(value + 1)
      setStringValue((value + 1))
    }
  }

  return (
    <div className="spinBox-container">
      <span className="spinBox-value">{ stringValue }</span>
      <div>
        <img className="iconBlueTypo spinBox-btn" src={previousIcon} width="26" height="26" alt="home" onClick={() => updateValueNeg()}/>
        <img className="iconBlueTypo spinBox-btn" src={nextIcon} width="26" height="26" alt="home" onClick={() => updateValuePos()}/>
      </div>
    </div>
  );
}