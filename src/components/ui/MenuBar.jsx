/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import { MenuButton } from './MenuButton';
import { Link } from "react-router-dom"

import { getFirstLetter } from '../../common/common';
import '../../style/component.css'

import homeIcon from "../../img/home.svg"
import logoutIcon from "../../img/logout.svg"
import settingsIcon from "../../img/settings.svg"
import graphIcon from "../../img/graph.svg"
import transfersIcon from "../../img/transfers.svg"


export const EMenu = {
  ACCEUIL: "Acceuil",
  VIREMENTS: "Virements",
  GRAPHIQUES: "Graphiques"
}

export const MenuBar = () => {

  const [activeButtons, setActivesButton] = useState([true, false, false])
  const [isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem("isLogin")) || false)

  const logOut = () => {
    sessionStorage.setItem("isLogin", false);
    sessionStorage.setItem("userConnected", "")
    window.location.pathname = "/login";
  }

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
    <div id="MenuBar" style={{display: JSON.parse(sessionStorage.getItem("isLogin")) || false ? "flex" : "none"}}>
      <p id="Logo">Eucleia</p>
      <ul>
        <Link to="/">
          <MenuButton active={activeButtons[0]} icon={homeIcon} onActiveChanged={changeMenu} label="Accueil"/>
        </Link>

        <Link to="/virements">
          <MenuButton active={activeButtons[1]} icon={transfersIcon} onActiveChanged={changeMenu} label="Virements"/>
        </Link>

        <Link to="/graphiques">
          <MenuButton active={activeButtons[2]} icon={graphIcon} onActiveChanged={changeMenu} label="Graphiques"/>
        </Link>
      </ul>

      <div id="Footer-Menu">
        <Link to="/user">
          <p className="pseudoCircle" style={{backgroundColor: sessionStorage.getItem("userColor")}}>
            {getFirstLetter(sessionStorage.getItem("userConnected"))}
          </p>
        </Link>

        <div>
          <Link to="/option"><img className="icon iconScaled" src={settingsIcon} width="26" height="26" alt="home" /></Link>
        </div>

        <div>
          <img className="icon iconScaled"src={logoutIcon} width="26" height="26" alt="home" onClick={() => logOut()}/>
        </div>
      </div>


    </div>
  );
};