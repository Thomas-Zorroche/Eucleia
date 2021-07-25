import { React, useEffect, useState } from 'react'

import { FormAddTransfer } from '../components/ui/FormAddTransfer'
import { BaseButton } from '../components/ui/BaseButton'


const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

export const EDateOption = {
  CurrentMonth: "CurrentMonth", // Mois courant
  OtherMonth: "OtherMonth",     // Choix d'un mois
  Date: "Date"                  // Date précise
}

export const AddTransferPage = () => {

  const [transferCount, setTransferCount] = useState(1);
  const [dateOption, setDateOption] = useState(EDateOption.CurrentMonth);
  const [indexMonth, setIndexMonth] = useState(0);


  useEffect(() => {
    if (dateOption === EDateOption.CurrentMonth)
    {
      const currentDate = new Date();
      setIndexMonth(currentDate.getMonth());
    }
  }, [dateOption])

  const updateIndexMonth = (e) => {
    let stringIndex = e.target.value;
    // Remove first '0' if index < 10 (01, 02, 03 ...)
    if (stringIndex.substring(0, 1) === "0")
      stringIndex = stringIndex.substring(1, 2)

    setIndexMonth(parseInt(stringIndex) - 1);
  }

  return (
    <div id="Page">

      <h1>Ajout Virement - Thomas {(dateOption !== EDateOption.Date) ? " - " + months[indexMonth] : ""}</h1>

      <form id="FormAddTransfertContainer" method="post" action="http://localhost/Eucleia/api/validateAddTransfer.php">

        <input type="text" name="pseudo" defaultValue="Thomas" style={{display:'none'}}></input>
        
        <div id="inputTransferCount">
          <label htmlFor="transferCount">Nombre de virements à ajouter :</label>
          <input type="number" name="transferCount" onChange={event => setTransferCount(parseInt(event.target.value))} defaultValue="1" min="1" max="20" />
        </div>

        <div className="container-options">

            <label> Mois Courant <input type="radio" name="date_option" value="current_month" defaultChecked="0" onClick={() => setDateOption(EDateOption.CurrentMonth)} /> </label>

            <label> Autre Mois <input type="radio" name="date_option" value="other_month" onClick={() => setDateOption(EDateOption.OtherMonth)} /> </label>

            <label> Date précise <input type="radio" name="date_option" value="complete" onClick={() => setDateOption(EDateOption.Date)} /> </label>

            <select name="month_choice" style={{display: dateOption === EDateOption.OtherMonth ? "block" : "none"}} onClick={(e) => updateIndexMonth(e)}>
              <option value="01">Janvier</option>
              <option value="02">Fevrier</option>
              <option value="03">Mars</option>
              <option value="04">Avril</option>
              <option value="05">Mai</option>
              <option value="06">Juin</option>
              <option value="07">Juillet</option>
              <option value="08">Aout</option>
              <option value="09">Septembre</option>
              <option value="10">Octobre</option>
              <option value="11">Novembre</option>
              <option value="12">Décemnbre</option>
            </select>

        </div>


        <div className="formAddTransfer addTransfertHeader">
          <div>Date</div>
          <div>Valeur</div>
          <div>Perso</div>
          <div>Type</div>
          <div>Commentaires</div>
        </div>

        {Array(transferCount).fill().map((t, i) => 
          <FormAddTransfer key={i} index={i} dateOption={dateOption}/>
        )}

        <BaseButton label="Ajouter" submit={true} callback={null}/>
      </form>

    </div>
  )
}