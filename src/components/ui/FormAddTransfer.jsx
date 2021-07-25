import { React } from 'react'

import { EDateOption } from '../../pages/AddTransferPage'

import '../../style/component.css'

export const FormAddTransfer = ({ index, dateOption }) => {

  return(
    <div className="formAddTransfer">
      <div>
        {dateOption === EDateOption.Date ? 
          <input type="date" name={"date_" + index}  min="2020-01-01" max="2021-12-31" required></input> 
          : <input type="number" name={"date_" + index} min="1" max="31" required /> 
        }
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