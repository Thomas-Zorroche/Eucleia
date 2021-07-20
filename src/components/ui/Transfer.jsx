import { React } from 'react'
import '../../style/component.css'

export const Transfer = ({ index, user, type, value, date, perso, comment}) => {

  return (
    <div className="transferContainer" 
      style={{backgroundColor: (index % 2 === 0) ? "var(--grey)" : "var(--greyDark)"}}
    >
      <p className="transferUser" >{user}</p>

      <p className="transferPerso">{perso === "1" ? "o" : "n" }</p>

      <p className="transferDate">{date}</p>

      <p className="transferType">{type}</p>

      <p className="transferComment" style={{flexGrow:4}}>{comment}</p>

      <p className="transferValue"
        style={{color: (value > 0) ? "green" : "red"}}
      >
        {(value > 0) ? "+" + value + "€" : value + "€"}
      </p>
    </div>
  )
}