import { React, useEffect, useState } from 'react'

import { EDateFilter } from './Footer'


export const BalanceHeader = ({ dateFilter }) => {

  const [expanses, setExpanses] = useState(0.0);
  const [incomes, setIncomes] = useState(0.0);
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    setBalance(incomes + expanses)
  }, [expanses, incomes])

  const updateBalance = () => {
    const form = new FormData();

    form.append("year", dateFilter.value.substring(0, 4));
    form.append("pseudo", sessionStorage.getItem("userConnected"))
    if (dateFilter.type === EDateFilter.MONTH)
      form.append("month", dateFilter.value.substring(5, 7));

    fetch("http://localhost/Eucleia/api/getBalance.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( balance => {
      setExpanses(parseFloat(balance.expanses))
      setIncomes(parseFloat(balance.incomes))
    })
  }

  useEffect(() => {
    if (dateFilter && dateFilter.value.length !== 0)
      updateBalance();
  }, [dateFilter])


  return (
    <div className="balanceHeader">
      <div>
        <p className="label-balanceHeader">Sorties</p>
        <p style={{color: "var(--red)", fontWeight: '900'}}>{expanses && expanses.toFixed(2)}€</p>
      </div>

      <div style={{color: "black"}}>|</div>
      
      <div>
        <p className="label-balanceHeader">Entrées</p>
        <p style={{color: "var(--green)", fontWeight: '900'}}>+{incomes && incomes.toFixed(2)}€</p>
      </div>

      <div style={{color: "black"}}>|</div>

      <div>
        <p className="label-balanceHeader">Balance</p>
        <p style={{color: "var(--blueLight)", fontWeight: '900'}}>{balance && balance > 0 ? "+" + balance.toFixed(2): balance.toFixed(2)}€</p>
      </div>
    </div>
  )

}