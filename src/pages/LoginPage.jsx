import React, { useCallback, useEffect, useState } from 'react';
import { BaseButton } from '../components/ui/BaseButton'

export const LoginPage = () => {

  const [pseudo, setPseudo] = useState("")
  const [password, setPassword] = useState("")
  const [loginFailed, setLoginFailed] = useState(false)


  useEffect(() => {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("userConnected", "")
  }, [])

  const onLogin = () => {
    // create formData, send to PHP, receive connected and pseudoConnected
    const form = new FormData();
    form.append("pseudo", pseudo);
    form.append("password", password);

    fetch("http://localhost/Eucleia/api/validateLogin.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.text();
    })
    .then( body => {

      if (body === '0') // NO ERROR: LOG IN
      {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("userConnected", pseudo)
        window.location.pathname = "/";
      }
      else if (body === '1') // ERROR: TRY AGAIN
      {
        setLoginFailed(true);
      }
      else  // SERVER ERROR
      {
        console.error(body);
      }
    })

  }

  const updatePseudo = (e) => {
    setPseudo(e.target.value)
    
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div id="Page">

      <div id="LoginContainer">
        <h1>Login</h1>

        {loginFailed && <p className="loginFailedWarning">Mauvais identifiant ou mot de passe !</p>}

        <form>
          <input type="text" name="pseudo" placeholder="username" value={pseudo} onChange={(e) => updatePseudo(e)} required/>
          <input type="password" name="password" placeholder="password" defaultValue={password} onChange={(e) => updatePassword(e)} required/>
          <BaseButton label="Log" submit={false} callback={onLogin}/>
        </form>

      </div>

    </div>
  )
}