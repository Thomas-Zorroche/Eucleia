import { React } from 'react'

import '../../style/component.css'

export const FormAddTransfert = ({ index }) => {

  console.log(index)

  return(
    <div className="formAddTransfer">
      <div>
        <input type="date" name={"date_" + index}  min="2020-01-01" max="2022-12-31" required></input>
      </div>

      <div>
        <input type="number" name={"value_" + index} min="0" max="10000" required />
      </div>
      
      <div>
        <input type="checkbox" name={"perso_" + index} />
      </div>

      <div>
        <select name={"type_" + index}>
          <option defaultValue="Courses">Courses</option>
          <option defaultValue="Autres">Autres</option>
          <option defaultValue="Restaurant">Restaurant</option>
          <option defaultValue="Transports">Transports</option>
        </select>
      </div>

      <div>
        <textarea name={"comment_" + index} rows="2" cols="30" placeholder="commentaires..."></textarea> 
      </div>

    </div>
  )
}