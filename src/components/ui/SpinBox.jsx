import { index } from 'd3';
import { React, useEffect, useState } from 'react';
import '../../style/component.css';

const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
const years = ["2020", "2021", "2022"];

export const ESpinBoxType = {
  NUMBER: "Number",
  MONTH: "MONTH",
  YEAR: "YEAR"
}

export const SpinBox = ({ type, onValueChange }) => {

  const [value, setValue] = useState("")

  useEffect(() => {
    if (type === ESpinBoxType.MONTH)
    {
      const date = new Date();
      const currentIndexMonth = date.getMonth();
      setValue(currentIndexMonth);
    }
    if (type === ESpinBoxType.NUMBER)
    {
      setValue(0);
    }
  }, [])

  useEffect(() => {
    onValueChange(value);
  }, [value])

  const updateValueNeg = () => {
    if (type === ESpinBoxType.MONTH)
    {
      setValue(value <= 0 ? 11 : value - 1)
    }
    if (type === ESpinBoxType.NUMBER)
      setValue(value - 1)
  }

  const updateValuePos = () => {
    if (type === ESpinBoxType.MONTH)
    {
      setValue(value >= 11 ? 0 : value + 1)
    }
    if (type === ESpinBoxType.NUMBER)
    {
      setValue(value + 1)
    }
  }

  return (
    <div className="spinBox-container">
      <span className="spinBox-btn" onClick={() => updateValueNeg()}>-</span>
      <span className="spinBox-value">{type === ESpinBoxType.MONTH ? months[value] : value}</span>
      <span className="spinBox-btn" onClick={() => updateValuePos()}>+</span>
    </div>
  );
}