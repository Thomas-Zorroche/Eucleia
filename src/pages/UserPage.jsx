import React, { useState } from 'react';
import { BaseButton } from '../components/ui/BaseButton';

export const UserPage = () => {

  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirmed, setNewPasswordConfirmed] = useState("")

  const [newColor, setNewColor] = useState("")

  const [updateMessage, setUpdateMessage] = useState("")


  const changePassword = () => {
    if (newPassword !== newPasswordConfirmed)
    {
      setUpdateMessage("Les mots de passes ne sont pas identiques, veuillez réessayer.")
      return;
    }

    const form = new FormData();
    form.append("pseudo", sessionStorage.getItem("userConnected"));
    form.append("password", password);
    form.append("newPassword", newPassword);
    form.append("newPasswordConfirmed", newPasswordConfirmed);

    fetch("http://localhost/Eucleia/api/validateUserChange.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( response => {
      if (!response.isPasswordCorrect)
      {
        setUpdateMessage("Mot de passe incorrect, veuillez réessayer.")
      }
      else if (response.isPasswordCorrect && !response.changeSucceed)
      {
        setUpdateMessage("Impossible de changer le mot de passe, veuillez réessayer.")
      }
      else if (response.isPasswordCorrect && response.changeSucceed)
      {
        setUpdateMessage("Mot de passe changé avec succès!")
      }
    })


  }

  const changeColor = () => {
    if (newColor.length != 7)
    {
      setUpdateMessage("Couleur invalide, veuillez réessayer.")
      return;
    }

    const form = new FormData();
    form.append("pseudo", sessionStorage.getItem("userConnected"));
    form.append("password", password);
    form.append("newColor", newColor);

    fetch("http://localhost/Eucleia/api/validateUserChange.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( response => {
      if (!response.isPasswordCorrect)
      {
        setUpdateMessage("Mot de passe incorrect, veuillez réessayer.")
      }
      else if (response.isPasswordCorrect && !response.changeSucceed)
      {
        setUpdateMessage("Impossible de changer la couleur, veuillez réessayer.")
      }
      else if (response.isPasswordCorrect && response.changeSucceed)
      {
        sessionStorage.setItem("userColor", newColor)
        window.location.pathname = "/user";
      }
    })
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }
  const updateNewPassword = (e) => {
    setNewPassword(e.target.value)
  }
  const updateNewPasswordConfirmed = (e) => {
    setNewPasswordConfirmed(e.target.value)
  }
  const updateNewColor = (e) => {
    setNewColor(e.target.value)
  }

  return (
    <div id="Page">

      <h1>Hello {sessionStorage.getItem("userConnected")}</h1>

      <form>
        <input type="password" placeholder="password" value={password} onChange={(e) => updatePassword(e)} required/>

        <input type="password"  placeholder="new password" maxlength="20" value={newPassword} onChange={(e) => updateNewPassword(e)} required/>

        <input type="password"  placeholder="confirm new password" maxlength="20" value={newPasswordConfirmed} onChange={(e) => updateNewPasswordConfirmed(e)} required/>
        
        <BaseButton label="Change Password" submit={false} callback={changePassword}/>
      </form>

      <form>
        <input type="password" placeholder="password" value={password} onChange={(e) => updatePassword(e)} required/>

        <input type="color" value={newColor} onChange={(e) => updateNewColor(e)} required/>

        <BaseButton label="Change Color" submit={false} callback={changeColor}/>
      </form>

      <p className="loginFailedWarning">{updateMessage}</p>

    </div>
  )
}