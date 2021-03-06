import { React, useEffect, useState } from 'react'

import { EDateOption } from '../../pages/AddTransferPage'

import '../../style/component.css'

export const FormAddTransfer = ({ index, dateOption }) => {

  const [secret, setSecret] = useState(false)

  const [types, setTypes] = useState([])

  const updateSecret = (e) => {
    setSecret(secret ? false : true);
  }

  useEffect(() => {
    const form = new FormData();
    form.append("getTypes", true);

    fetch("http://localhost/Eucleia/api/validateType.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( types => {
      if (!types) return;
      console.log(types)
      setTypes(types);
    })
  }, [])

  return(
    <div className="formAddTransfer">
      <div>
        {dateOption === EDateOption.Date ? 
          <input type="date" name={"date_" + index}  min="2020-01-01" max="2022-12-31" required></input> 
          : <input type="number" name={"date_" + index} min="1" max="31" required /> 
        }
      </div>

      <div>
        <input type="number" name={"value_" + index} min="-2000" max="10000" step="0.01" required />
      </div>

      <div>
        <input type="checkbox" name={"secret_" + index} onChange={(e) => updateSecret(e)}/>
      </div>
      
      <div>
        <input type="checkbox" name={"perso_" + index} disabled={secret} />
      </div>

      <div>
        <select name={"type_" + index}>
          {types.map(type => <option defaultValue={type.label}>{type.label}</option>)}
        </select>
      </div>

      <div>
        <textarea name={"comment_" + index} rows="2" cols="30" placeholder="commentaires..."></textarea> 
      </div>

    </div>
  )
}