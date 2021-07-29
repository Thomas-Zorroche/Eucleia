import { React, useEffect, useState } from 'react'
import '../../style/component.css'
import { BaseButton } from './BaseButton';

import { getUserIndexByPseudo } from '../../common/common';

export const Transfer = ({ index, pseudo, type, value, date, perso, secret, comment, usersDatas}) => {

  const [isSecret, setIsSecret] = useState((secret === "1") ? true : false)
  const [backgroundColor, setBackgroundColor] = useState("")
  const [tvalue, setTValue] = useState(isSecret ? 0 : value)
  const [password, setPassword] = useState("")

  useEffect(() => {
    const userIndex = getUserIndexByPseudo(usersDatas, pseudo);

    if (userIndex === -1)
    {
      console.error("TRANSFER: CANT FIND PSEUDO")
      return;
    }

    setBackgroundColor(perso === "1" ? usersDatas[userIndex].colors.colorDark : usersDatas[userIndex].colors.colorDarkLight);
  }, [])

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const showSecretTransfer = () => {
    const form = new FormData();
    form.append("password", password);
    form.append("pseudo", sessionStorage.getItem("userConnected"));

    fetch("http://localhost/Eucleia/api/validateLogin.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( loginData => {
      if (loginData.login)
      {
        setIsSecret(false);
        setTValue(value)
      }
    })

  }

  return (
    <div>
      {isSecret && 
        <div className="inputTextSecretTransfer">
          <input type="password" placeholder="password" defaultValue={password} onChange={(e) => updatePassword(e)}/> 
          <BaseButton label="Montrer" submit={false} callback={showSecretTransfer}/>
        </div>}

      <div className={isSecret ? "transferContainer transferContainerSecret" :  "transferContainer"}
        style={{backgroundColor: backgroundColor}}
      >

        <p className="transferUser" >{pseudo}</p>

        <p className="transferPerso">{perso === "1" ? "o" : "n" }</p>

        <p className="transferDate">{date}</p>

        <p className="transferType">{type}</p>

        <p className="transferComment" style={{flexGrow:4}}>{comment}</p>

        <p className="transferValue"
          style={{color: (tvalue > 0) ? "green" : "red"}}
        >
          {(tvalue > 0) ? "+" + tvalue + "€" : tvalue + "€"}
        </p>
      </div>
    </div>
  )
}