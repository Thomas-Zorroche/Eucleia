/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import { MenuButton } from './MenuButton';
import { Link } from "react-router-dom"
import '../../style/component.css'

export const EMenu = {
  ACCEUIL: "Acceuil",
  VIREMENTS: "Virements",
  GRAPHIQUES: "Graphiques"
}

export const MenuBar = () => {

  const [activeButtons, setActivesButton] = useState([true, false, false])

  const changeMenu = (label) => {
    // Change Active Menu
    switch (label) {
      case EMenu.ACCEUIL:    
        setActivesButton([true, false, false])
        break;
      case EMenu.VIREMENTS:  
        setActivesButton([false, true, false])  
        break;
      case EMenu.GRAPHIQUES: 
        setActivesButton([false, false, true])
        break;
      default:              
        setActivesButton([true, false, false])
        break;
    }
  }

  return (
    <div id="MenuBar">
      <ul>
        <Link to="/">
          <MenuButton active={activeButtons[0]} onActiveChanged={changeMenu} label="Acceuil"/>
        </Link>

        <Link to="/virements">
          <MenuButton active={activeButtons[1]} onActiveChanged={changeMenu} label="Virements"/>
        </Link>

        <Link to="/graphiques">
          <MenuButton active={activeButtons[2]} onActiveChanged={changeMenu} label="Graphiques"/>
        </Link>

      </ul>
    </div>
  );
};