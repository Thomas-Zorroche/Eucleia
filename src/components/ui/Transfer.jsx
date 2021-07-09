import { React } from 'react'
import '../../style/component.css'

export const Transfer = ({ index, user, value, date, comment}) => {

  return (
    <div className="transferContainer" 
      style={{backgroundColor: (index % 2 === 0) ? "var(--grey)" : "var(--greyDark)"}}
    >
      <p className="transferUser" >{user}</p>

      <p className="transferPerso">o</p>

      <p className="transferDate">{date}</p>

      <p className="transferType">COURSES</p>

      <p className="transferComment" style={{flexGrow:4}}>{comment}</p>

      <p className="transferValue"
        style={{color: (value > 0) ? "green" : "red"}}
      >
        {(value > 0) ? "+" + value + "€" : value + "€"}
      </p>
    </div>
  )
}