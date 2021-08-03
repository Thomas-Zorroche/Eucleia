import { React, useEffect, useState } from 'react'
import '../../style/component.css'
import { BaseButton } from './BaseButton';

import { getUserIndexByPseudo } from '../../common/common';

/*
transfer:
- value
- user
- pesro
- date
- type
- comment
- secret (OPT)

*/
export const Transfer = ({ transfer, usersDatas}) => {

  const [isSecret, setIsSecret] = useState()
  const [backgroundColor, setBackgroundColor] = useState("")
  const [value, setValue] = useState()
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (!transfer || !usersDatas) 
    {
      setValue("0")
      setIsSecret(false)
      return;
    }

    setIsSecret((transfer.secret === "1") ? true : false)
    setValue(transfer.secret === "1" ? "" : transfer.value)

    const userIndex = getUserIndexByPseudo(usersDatas, transfer.user);

    if (userIndex === -1)
    {
      console.error("TRANSFER: CANT FIND PSEUDO")
      return;
    }

    setBackgroundColor(transfer.perso === "1" ? usersDatas[userIndex].colors.colorDark : usersDatas[userIndex].colors.colorDarkLight);
  }, [transfer])

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
        setValue(transfer.value)
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
        <p className="transferUser" >{(transfer && transfer.user) || "Pseudo"}</p>

        <p className="transferPerso">{(transfer && (transfer.perso === "1" ? "Perso" : "Commun")) || "" }</p>

        <p className="transferDate">{(transfer && transfer.date) || "date"}</p>

        <p className="transferType">{(transfer && transfer.type) || "type"}</p>

        <p className="transferComment" style={{flexGrow:4}}>{(transfer && transfer.comment) || "commentaires"}</p>

        <p className="transferValue"
          style={{color: (value > 0) ? "green" : "red"}}
        >
          {(value > 0) ? "+" + value + "€" : value + "€"}
        </p>
      </div>
    </div>
  )
}