import { React, useState, useEffect } from 'react';
import { BarChart } from '../components/d3/BarChart';

import { getColorFromTransfer, getMainColorFromPseudo } from '../common/common';
import { getColorVariants } from '../common/colors';
import { Transfer } from '../components/ui/Transfer';


const sortByDates = (data) => {
  return data.sort(function (a,b) {
    return new Date(a.date) - new Date(b.date);
  })
}

export const GraphiquePage = ({ usersDatas, dateFilter }) => {
  // Contains dates
  const [dataX, setDataX] = useState([]);
  // Contains transfer
  const [dataY, setDataY] = useState([]);
  // Transfer on Hover
  const [transferHover, setTransferHover] = useState();
  
  async function loadData()
  {
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
      if (!transfers || !Array.isArray(transfers))
        return;
      
      sortByDates(transfers);
  
      setDataX(transfers.map(t => t.date));

      setDataY(transfers.map(transfer => {
        return ({...transfer, color: getMainColorFromPseudo(transfer.user, usersDatas)});
      }));
      
    })
  }

  useEffect(() => {
    if (dateFilter && usersDatas && usersDatas.length !== 0)
      loadData();
  }, [dateFilter, usersDatas])

  const onTransferHover = (hover, index) => {
    setTransferHover(hover ? dataY[index] : "")
  }


  return (
    <div id="Page">
        
        <h1>Graphiques - {dataY.length}</h1>

        <div className="transfer-hover">
          <Transfer transfer={transferHover} usersDatas={usersDatas} />
        </div>
        
        <BarChart
          width={1500}
          height={750} 
          dataX={dataX} 
          dataY={dataY}
          backgroundColor={getColorVariants(sessionStorage.getItem("userColor")).colorDark}
          onTransferHover={onTransferHover}
        />

    </div>
  )
}