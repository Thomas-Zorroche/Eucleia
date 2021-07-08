/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react';
import { MenuButton } from './MenuButton';
import '../../style/component.css'

export const EMenu = {
  ACCEUIL: "Acceuil",
  VIREMENTS: "Virements",
  GRAPHIQUES: "Graphiques"
}

export const MenuBar = ({ onMenuChanged }) => {

  const [activeMenu, setActiveMenu] = useState(EMenu.Acceuil);
  const [activeButtons, setActivesButton] = useState([true, false, false])

  const changeMenu = (label) => {
    // Change Active Menu
    switch (label) {
      case EMenu.ACCEUIL:    
        setActiveMenu(EMenu.ACCEUIL); 
        setActivesButton([true, false, false])
        break;
      case EMenu.VIREMENTS:  
        setActiveMenu(EMenu.VIREMENTS);
        setActivesButton([false, true, false])  
        break;
      case EMenu.GRAPHIQUES: 
        setActiveMenu(EMenu.GRAPHIQUES); 
        setActivesButton([false, false, true])
        break;
      default:              
        setActiveMenu(EMenu.ACCEUIL);    
        setActivesButton([true, false, false])
        break;
    }
  }

  useEffect(() => {
    onMenuChanged(activeMenu || EMenu.ACCEUIL);
  }, [activeMenu])

  return (
    <div id="MenuBar">
      Eucleia
      <ul>
        <MenuButton active={activeButtons[0]} onActiveChanged={changeMenu} label="Acceuil"/>
        <MenuButton active={activeButtons[1]} onActiveChanged={changeMenu} label="Virements"/>
        <MenuButton active={activeButtons[2]} onActiveChanged={changeMenu} label="Graphiques"/>
      </ul>
    </div>
  );
};