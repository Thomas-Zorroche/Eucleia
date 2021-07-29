import { React, useEffect, useState } from 'react'
import '../../style/component.css'
import { BaseButton } from './BaseButton';

import { getUserColors } from "../../common/colors.js" 

export const Transfer = ({ index, user, type, value, date, perso, secret, comment, userColors}) => {

  const [isSecret, setIsSecret] = useState((secret === "1") ? true : false)
  const [backgroundColor, setBackgroundColor] = useState("")
  const [tvalue, setTValue] = useState(isSecret ? 0 : value)
  const [password, setPassword] = useState("")


  useEffect(() => {
    if (index % 2) {
      setBackgroundColor(userColors['color-dark']);
    }
    else{
      setBackgroundColor(userColors['color-dark-light']);
    }
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

        <p className="transferUser" >{user}</p>

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