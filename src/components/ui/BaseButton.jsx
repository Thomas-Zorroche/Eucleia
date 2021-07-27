import { React } from 'react'

export const BaseButton = ({ label, submit, callback }) => {

  return(
    <button className="baseButton" type={submit ? "submit" : "button"} onClick={callback}>{label}</button>
  )
}