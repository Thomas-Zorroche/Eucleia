import { React, useState, useEffect } from 'react'
import { HeaderValueViewer } from './HeaderValueViewer'
import { Link } from "react-router-dom"


const getFirstLetter = (string) => {
  if (!string || string.length === 0) 
    return

  return string.substring(0, 1).toUpperCase();
} 

export const HeaderBar = () => {

  const [isLogin, setIsLogin] = useState(JSON.parse(sessionStorage.getItem("isLogin"))  || false)

  const logOut = () => {
    sessionStorage.setItem("isLogin", false);
    sessionStorage.setItem("userConnected", "")
    window.location.pathname = "/login";
  }

  return (
    <div id="HeaderBar" style={{display: isLogin ? "flex" : "none"}}>

      <div id="HeaderLeft">
        <h1>Eucleia</h1> 

        <HeaderValueViewer label="Entrées" color="green"/>

        <HeaderValueViewer label="Sorties" color="red"/>

        <HeaderValueViewer label="Balance" color="orange"/>
      </div>


      <div id="HeaderRight">
        <div className='header-link'>
          <Link to="/option"><p>Options</p></Link>
        </div>

        <Link to="/user">
          <p className="pseudoCircle" style={{backgroundColor: sessionStorage.getItem("userColor")}}>{getFirstLetter(sessionStorage.getItem("userConnected"))}</p>
        </Link>

        <div className='header-link'>
          <p onClick={() => logOut()}>Log Out</p>
        </div>
      </div>
      
    </div>
  )
}