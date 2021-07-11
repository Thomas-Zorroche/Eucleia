import { React, useEffect, useState } from 'react'

import { FormAddTransfert } from '../components/ui/FormAddTransfert'
import { BaseButton } from '../components/ui/BaseButton'

export const AddTransfertPage = () => {

  const [transferCount, setTransferCount] = useState(1);

  const onTransferCountButtonClick = (event) => {
    setTransferCount(event.target.value)
  }

  useEffect(() => {
    console.log("hello")
  }, [transferCount])

  return (
    <div id="Page">

      <h1>Ajout Virement - Thomas</h1>

      <div id="inputTransferCount">
        <label for="transferCount">Nombre de virements à ajouter :</label>
        <input type="number" onChange={event => setTransferCount(parseInt(event.target.value))} name="transferCount" min="1" max="20" />
      </div>

      <form id="FormAddTransfertContainer">
        <div class="formAddTransfer addTransfertHeader">
          <div>Date</div>
          <div>Valeur</div>
          <div>Perso</div>
          <div>Type</div>
          <div>Commentaires</div>
        </div>
        {Array(transferCount).fill().map((t, i) => {
          return <FormAddTransfert key={i}/>
        })}

        <BaseButton label="Ajouter"/>
        {/* <input class="baseButton" type="submit" value="Ajouter" /> */}
      </form>

    </div>
  )
}