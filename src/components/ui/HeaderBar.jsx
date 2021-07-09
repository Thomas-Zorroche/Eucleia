import { React } from 'react'
import { HeaderValueViewer } from './HeaderValueViewer'

export const HeaderBar = () => {

  return (
    <div id="HeaderBar">

      <h1>Eucleia</h1>

      <HeaderValueViewer label="Entrées" color="green"/>

      <HeaderValueViewer label="Sorties" color="red"/>

      <HeaderValueViewer label="Balance" color="orange"/>
      
    </div>
  )
}