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




export const VirementPage = ({ usersDatas, dateFilter }) => {

  const [transfers, setTransfers] = useState([])

  async function loadData(dateFilter) {
    if (dateFilter)
    {
      const form = new FormData();
      form.append("dateFilterType", dateFilter.type);
      form.append("dateFilterValue", dateFilter.value + 1);

      fetch("http://localhost/Eucleia/api/getTransfers.php", {
        method: "POST",
        body: form
      })
      .then(res => {
        return res.json();
      })
      .then( transfers => {
        setTransfers(transfers);
      })

    }
    else
    {
      setTransfers(await queryDatabase("transfers"));
    }
  }

  useEffect(() => {
    setTransfers(transfers);
    loadData();
  }, [])

  useEffect(() => {
    loadData(dateFilter);
  }, [dateFilter])


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
          <Transfer key={t.id} index={i} perso={t.perso} secret={t.secret} user={t.user} type={t.type} value={t.value} date={t.date} comment={t.comment} userColors={usersDatas.get(t.user) || {}} />
        )}
      </div>

    </div>


  )
}