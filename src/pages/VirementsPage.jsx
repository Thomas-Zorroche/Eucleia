import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"


import { Transfer } from '../components/ui/Transfer';
import { BaseButton } from '../components/ui/BaseButton';

async function queryDatabase(query) {
  const response = await fetch("http://localhost/Eucleia/api/eucleia/?q=" + query, {
    method: "GET"
  });
  const json = await response.json();
  return json;
}

export const VirementPage = () => {

  const [transfers, setTransfers] = useState([])

  useEffect(() => {
    async function loadData()
    {
      setTransfers(await queryDatabase("transfers"));
    }

    loadData();
  }, [])

  return (
    <div id="Page">
      <h1>Virements</h1>

      <Link to="/addTransfer">
        <BaseButton label={"Ajout Virement"} />
      </Link>

      <div className="transfers">
        <div className="transferContainer transferHeader"  style={{backgroundColor: "var(--greyDark)"}}>
          <p>User</p>
          <p>Perso</p>
          <p>Date</p>
          <p>Type</p>
          <p style={{flexGrow:4}}>Commentaire</p>
          <p>Value</p>
        </div>
        {transfers.map((t, i) => 
          <Transfer key={t.id} index={i} perso={t.perso} user={t.user} type={t.type} value={t.value} date={t.date} comment={t.comment} />
        )}
      </div>

    </div>


  )
}