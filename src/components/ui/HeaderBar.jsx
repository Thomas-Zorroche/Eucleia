import { local, pointer } from 'd3'
import { React, useState, useEffect } from 'react'
import { HeaderValueViewer } from './HeaderValueViewer'


export const HeaderBar = () => {

  const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem("isLogin"))  || false)

  const logOut = () => {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("userConnected", "")
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
        <p>{localStorage.getItem("userConnected")}</p>

        <p className='logout' onClick={() => logOut()}>Log Out</p>
      </div>

      
    </div>
  )
}