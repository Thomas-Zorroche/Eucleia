import { React } from 'react'

import '../../style/component.css'

export const FormAddTransfert = ({ label }) => {

  return(
    <div class="formAddTransfer">
      <div>
        <input type="date" name="date"  min="2020-01-01" max="2022-12-31"></input>
      </div>

      <div>
        <input type="number" name="value" min="0" max="10000" />
      </div>
      
      <div>
      <input type="checkbox" name="perso" />
      </div>

      <div>
        <select name="type">
          <option value="volvo">Courses</option>
          <option value="saab">Autres</option>
          <option value="fiat">Resto</option>
          <option value="audi">Transports</option>
        </select>
      </div>

      <div>
        <textarea name="message" rows="2" cols="30" placeholder="commentaires..."></textarea> 
      </div>

    </div>
  )
}