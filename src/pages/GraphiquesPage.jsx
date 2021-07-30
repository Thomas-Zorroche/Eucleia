import { React, useState, useEffect } from 'react';
import { BarChart } from '../components/d3/BarChart';

import { getColorFromTransfer, getMainColorFromPseudo } from '../common/common';
import { getColorVariants } from '../common/colors';


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

      setDataY(transfers.map(t => {
        return {value: parseInt(t.value), color: /*getColorFromTransfer(t, usersDatas)*/ getMainColorFromPseudo(t.user, usersDatas), comment: t.comment }
      }));
    })
  }

  useEffect(() => {
    if (dateFilter && usersDatas && usersDatas.length !== 0)
      loadData();
  }, [dateFilter, usersDatas])


  return (
    <div id="Page">
        <h1>Graphiques - {dataY.length}</h1>

        <BarChart
          width={1500}
          height={750} 
          dataX={dataX} 
          dataY={dataY}
          backgroundColor={getColorVariants(sessionStorage.getItem("userColor")).colorDark}
        />

        {/* {dataY.map((transfer, i) => {
          return <p>{dataX[i]} --- {transfer.value} </p>
        })} */}

    </div>
  )
}