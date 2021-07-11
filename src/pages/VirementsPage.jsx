import { React, useState } from 'react';
import { Link } from "react-router-dom"


import { Transfer } from '../components/ui/Transfer';
import { BaseButton } from '../components/ui/BaseButton';

const transfersTest = [
  {id:0, user:"Thomas", value: 55, date: "2021-07-05", comment:"Courses Carrefour Bay2 Torcy - Anniversaire 17 mois"},
  {id:1, user:"Emma", value: -445, date: "2021-12-05", comment:"Courses de Noel Carrefour Bay 2"},
  {id:2, user:"Thomas", value: -1000, date: "2021-07-05", comment:"LOLOL...."},
  {id:3, user:"Emma", value: 4, date: "2021-01-05", comment:"Ceci est un très très logn commentaires bllbalal fjiehfopjfwjlm.... \
  Ceci est un très très logn commentaires bllbalal fjiehfopjfwsss"},

]

export const VirementPage = () => {

  const [transfers, setTransfers] = useState([])

  return (
    <div id="Page">
      <h1>Virements</h1>

      <Link to="/addTransfert">
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
        {transfersTest.map((t, i) => 
          <Transfer key={t.id} index={i} user={t.user} value={t.value} date={t.date} comment={t.comment} />
        )}
      </div>

    </div>


  )
}