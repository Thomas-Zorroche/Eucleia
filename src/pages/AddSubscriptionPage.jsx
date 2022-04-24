import { React, useEffect, useState } from 'react'

import { FormAddSubscription } from '../components/ui/FormAddSubscription'
import { BaseButton } from '../components/ui/BaseButton'


const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

export const ESubsFrequency = {
  Mensuel: "Mensuel",
  Annuel: "Annuel"
}

export const AddSubscriptionPage = ({ usersDatas }) => {

  const [subscriptionCount, setSubscriptionCount] = useState(1);


  return (
    <div id="Page">

      <h1>Ajout Abonnement - {sessionStorage.getItem("userConnected")}</h1>

      <form id="FormAddTransfertContainer" method="post" action="http://localhost/Eucleia/api/validateAddSubscription.php">

        <input type="text" name="pseudo" defaultValue={sessionStorage.getItem("userConnected")} style={{display:'none'}}></input>
        
        <div id="inputTransferCount">
          <label htmlFor="transferCount">Nombre de virements à ajouter :</label>
          <input type="number" name="subscriptionCount" onChange={event => setSubscriptionCount(parseInt(event.target.value))} defaultValue="1" min="1" max="20" />
        </div>

        <div className="formAddTransfer addTransfertHeader">
          <div>Frequence</div>
          <div>Date</div>
          <div>Valeur</div>
          <div>Perso</div>
          <div>Type</div>
          <div>Commentaires</div>
        </div>

        {Array(subscriptionCount).fill().map((t, i) => 
          <FormAddSubscription key={i} index={i} usersDatas={usersDatas} />
        )}

        <BaseButton label="Ajouter" submit={true} callback={null}/>
      </form>

    </div>
  )
}