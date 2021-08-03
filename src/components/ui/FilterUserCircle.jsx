import { React, useEffect, useState } from 'react';
import '../../style/component.css';

export const EFilterUser = {
  NONE:   "None",   // aucun
  PERSO:  "Perso",
  COMMON: "Common",
  ALL:    "All"     // perso + commun
}

export const FilterUserCircle = ({ pseudo, colors, filterInit, onUserFilterChange, index }) => {

  const letter = pseudo.substring(0, 1).toUpperCase();

  const [filter, setFilter] = useState()
  const [backgroundColor, setBackgroundColor] = useState("")
  const [borderColor, setBorderColor] = useState("")

  const updateFilter = () => {
    if (filter === EFilterUser.NONE)   setFilter(EFilterUser.PERSO)
    if (filter === EFilterUser.PERSO)  setFilter(EFilterUser.COMMON)
    if (filter === EFilterUser.COMMON) setFilter(EFilterUser.ALL)
    if (filter === EFilterUser.ALL)    setFilter(EFilterUser.NONE)
  }

  useEffect(() => {
    if (!colors)
      return;

    if (filter === EFilterUser.NONE) {
      setBackgroundColor("")
      setBorderColor("#333333")
    }
    if (filter === EFilterUser.PERSO) {
      setBackgroundColor(colors.colorDark)
      setBorderColor("#00000000")
    }
    if (filter === EFilterUser.COMMON) {
      setBackgroundColor(colors.colorDarkLight)
      setBorderColor("#00000000")
    }
    if (filter === EFilterUser.ALL) {
      setBackgroundColor(colors.colorDark)
      setBorderColor(colors.color)
    }

    onUserFilterChange(filter, index);
  }, [filter, colors])

  useEffect(() => {
    setFilter(filterInit)
  }, [])

  return (
    <div className="filterUserCircle" title={filter} style={{backgroundColor: backgroundColor, borderColor: borderColor}} onClick={() => updateFilter()}>
      {letter}
    </div>
  );
};