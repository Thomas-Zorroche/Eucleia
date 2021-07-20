import { React } from 'react'

export const BaseButton = ({ label, submit, callback }) => {

  // const click = () => {
  //   callbacka();
  // }

  return(
    <button className="baseButton" type={submit ? "submit" : "button"} onClick={callback}>{label}</button>
  )
}