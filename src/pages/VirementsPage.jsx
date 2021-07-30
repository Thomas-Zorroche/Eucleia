import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import { Transfer } from '../components/ui/Transfer';
import { BaseButton } from '../components/ui/BaseButton';



export const VirementPage = ({ usersDatas, dateFilter }) => {

  const [transfers, setTransfers] = useState([])

  async function loadData() {

    const form = new FormData();
    form.append("dateFilterType", dateFilter.type);
    form.append("dateFilterValue", dateFilter.value + 1);
    form.append("userCount", usersDatas.length)
    usersDatas.map((user, i) => {
      form.append("user_" + i, user.pseudo);
      form.append("userFilter_" + i, user.userFilter);
    })

    fetch("http://localhost/Eucleia/api/getTransfers.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( transfers => {
      setTransfers(transfers && Array.isArray(transfers) ? transfers : []);
    })
  }

  useEffect(() => {
    if (dateFilter && usersDatas && usersDatas.length !== 0)
      loadData();
  }, [dateFilter, usersDatas])


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
        {transfers && transfers.map((t, i) =>
          <Transfer key={t.id} transfer={t} usersDatas={usersDatas} />
        )}
      </div>

    </div>


  )
}