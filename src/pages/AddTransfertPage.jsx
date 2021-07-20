import { React, useEffect, useState, Children } from 'react'

import { FormAddTransfert } from '../components/ui/FormAddTransfert'
import { BaseButton } from '../components/ui/BaseButton'


async function updateDatabase(form) {
  const response = await fetch("http://localhost/Eucleia/api/eucleia", {
    method: "POST",
    body: form
  });
  const json = await response.json();
  return json;
}

export const AddTransfertPage = () => {

  const [transferCount, setTransferCount] = useState(1);

  const sendData = () => {
    const formData = new FormData();

    // transferComponents.map((t, i) => {
    //   formData.append("date_" + i, t.date);
    //   formData.append("value_" + i, t.value);
    //   formData.append("perso_" + i, t.perso);
    //   formData.append("type_" + i, t.type);
    //   formData.append("comment_" + i, t.comment);
    // })

    console.log("Children.count(this.props.children)")
  }

  return (
    <div id="Page">

      <h1>Ajout Virement - Thomas</h1>


      <form id="FormAddTransfertContainer" method="post" action="http://localhost/Eucleia/api/validateAddTransfer.php">

        <input type="text" name="pseudo" defaultValue="Thomas" style={{display:'none'}}></input>
        
        <div id="inputTransferCount">
          <label htmlFor="transferCount">Nombre de virements à ajouter :</label>
          <input type="number" name="transferCount" onChange={event => setTransferCount(parseInt(event.target.value))} defaultValue="1" min="1" max="20" />
        </div>

        <div className="formAddTransfer addTransfertHeader">
          <div>Date</div>
          <div>Valeur</div>
          <div>Perso</div>
          <div>Type</div>
          <div>Commentaires</div>
        </div>

        {Array(transferCount).fill().map((t, i) => 
          <FormAddTransfert key={i} index={i}/>
        )}

        <BaseButton label="Ajouter" submit={true} callback={null}/>
      </form>

    </div>
  )
}