import { React, useState } from 'react'

export const HeaderValueViewer = ({ label, color }) => {

  const [value, setValue] = useState(500);

  return (
    <div className="headerComponent">
      <p className="labelHeaderComp">{label}</p>
      
      <p className="valueHeaderComp" style={{color: color}}>
        {value > 0 ? "+" + value : value}
      </p>
    </div>
  )

}