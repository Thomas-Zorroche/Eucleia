import { React, useState, useEffect } from 'react';
import { BarChart } from '../components/d3/BarChart';

import { getColorFromTransfer, getMainColorFromPseudo, getMonthNameFromDate } from '../common/common';
import { getColorVariants } from '../common/colors';
import { Transfer } from '../components/ui/Transfer';
import { EDateFilter } from '../components/ui/Footer';


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
  // Transfer background color are type color
  const [colorizeType, setColorizeType] = useState(false)
  
  async function loadData()
  {
    const form = new FormData();
    
    form.append("year", dateFilter.value.substring(0, 4));
    if (dateFilter.type === EDateFilter.MONTH)
      form.append("month", dateFilter.value.substring(5, 7));

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

      if (dateFilter.type === EDateFilter.MONTH)
        setDataX(transfers.map(transfer => transfer.date));
      else
      setDataX(transfers.map(transfer => getMonthNameFromDate(transfer.date)));

      setDataY(transfers.map(transfer => {
        const value = transfer.value;
        return ({...transfer, expense: value < 0, value: Math.abs(transfer.value), userColor: getMainColorFromPseudo(transfer.user, usersDatas)});
      }));
      
    })
  }

  useEffect(() => {
    if (dateFilter && usersDatas && usersDatas.length !== 0)
      loadData();
  }, [dateFilter, usersDatas])

  const onTransferHover = (hover, index) => {
    setTransferHover(hover ? dataY[index] : null)
  }

  const onColorizeTypeChanged = (e) => {
    setColorizeType(colorizeType ? false : true);
  }

  return (
    <div id="Page">
        
        <h1>Graphiques - {dataY.length} dépenses</h1>

        <div className="transfer-hover">
          <Transfer transfer={transferHover} usersDatas={usersDatas} isTransfertChartPreview={true} />
        </div>
        
        <BarChart
          width={1500}
          height={750} 
          dataX={dataX} 
          dataY={dataY}
          backgroundColor={getColorVariants(sessionStorage.getItem("userColor")).colorDark}
          onTransferHover={onTransferHover}
          dateFilter={dateFilter}
          colorizeType={colorizeType}
        />

        
        <div>
          <span>Colorize by types</span>
          <input type="checkbox" onChange={(e) => onColorizeTypeChanged(e)}/>
        </div>

        {/* <input type="range" name="range-1a" id="range-1a" min="0" max="12" defaultValue="0" data-popup-enabled="true" data-show-value="true" />
        <input type="range" name="range-1a" id="range-1a" min="0" max="12" defaultValue="0" data-popup-enabled="true" data-show-value="true" />     */}


    </div>
  )
}