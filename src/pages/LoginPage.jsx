import React, { useEffect, useState } from 'react';
import { BaseButton } from '../components/ui/BaseButton'

export const LoginPage = () => {

  const [pseudo, setPseudo] = useState("")
  const [password, setPassword] = useState("")
  const [loginFailed, setLoginFailed] = useState(false)


  useEffect(() => {
    sessionStorage.setItem("isLogin", false);
    sessionStorage.setItem("userConnected", "")
  }, [])

  const onLogin = () => {
    const form = new FormData();
    form.append("pseudo", pseudo);
    form.append("password", password);

    fetch("http://localhost/Eucleia/api/validateLogin.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( loginData => {

      if (loginData.login) // NO ERROR: LOG IN
      {
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("userConnected", loginData.user)
        sessionStorage.setItem("userColor", loginData.userColor)

        window.location.pathname = "/";
      }
      else if (!loginData.login) // ERROR: TRY AGAIN
      {
        setLoginFailed(true);
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
        <h1>Eucleia 0.1</h1>
        
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