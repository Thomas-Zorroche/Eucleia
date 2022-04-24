import { React, useEffect, useState } from 'react'

import { ESubsFrequency } from '../../pages/AddSubscriptionPage'

import '../../style/component.css'

export const FormAddSubscription = ({ index, usersDatas }) => {

  const [types, setTypes] = useState([])
  const [frequency, setFrequency] = useState(ESubsFrequency.Mensuel)
  const [perso, setPerso] = useState(false)

  const updateFrequency = (e) => {
    setFrequency(e.target.value === "Mensuel" ? ESubsFrequency.Mensuel : ESubsFrequency.Annuel);
  }

  const updatePerso = (e) => {
    setPerso(!perso);
  }

  useEffect(() => {
    // Retrieve types
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
      setTypes(types);
    })

  }, [])

  return(
    <div className="formAddTransfer">
      <div>
        <select name={"Datetype_" + index} onChange={(e) => updateFrequency(e)}>
          <option defaultValue="Mensuel">Mensuel</option>
          <option defaultValue="Annuel">Annuel</option>
        </select>
      </div>

      <div>
        {frequency === ESubsFrequency.Annuel ? 
          <input type="date" name={"date_" + index}  min="2020-01-01" max="2022-12-31" required></input> 
          : <input type="number" name={"date_" + index} min="1" max="31" required /> 
        }
      </div>

      <div>
        <input type="number" name={"value_" + index} min="-2000" max="10000" step="0.01" required />
      </div>

      <div>
        <input type="checkbox" name={"perso_" + index} onChange={(e) => updatePerso(e)} />
      </div>

      <div style={{display: perso ? "none" : "block"}}>
        {usersDatas
          .filter(user => user.pseudo !== sessionStorage.getItem("userConnected"))
          .map(user => <p>{user.pseudo}</p>)
        }
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