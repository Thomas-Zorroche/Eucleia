import { React, useState } from 'react'

import { EDateOption } from '../../pages/AddTransferPage'

import '../../style/component.css'

export const FormAddTransfer = ({ index, dateOption }) => {

  const [secret, setSecret] = useState(false)

  const updateSecret = (e) => {
    setSecret(secret ? false : true);
  }

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
        <input type="checkbox" name={"secret_" + index} onChange={(e) => updateSecret(e)}/>
      </div>
      
      <div>
        <input type="checkbox" name={"perso_" + index} disabled={secret} />
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