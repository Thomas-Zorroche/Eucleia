import React, { useEffect, useState } from 'react';
import { BaseButton } from '../components/ui/BaseButton';

export const OptionPage = () => {
  // Array of types to be modified
  const [types, setTypes] = useState([])
  // Reference array of types. Compare this with types above
  // to know which type changed. 
  const [typesRef, setTypesRef] = useState([])
  // Info Message
  const [infoMessage, setInfoMessage] = useState("")

  const getTypesToUpdate = () => {
    return types.filter((type, index) => type.label !== typesRef[index].label || type.color !== typesRef[index].color)
  }

  const onUpdateTypes = () => {

    // Retrieve array of types that need to be updated
    const typesToUpdate = getTypesToUpdate(); 
    if (typesToUpdate.length === 0)
    {
      setInfoMessage("No change to update.")
      return;
    }

    const form = new FormData();
    form.append("typeCount", typesToUpdate.length)
    typesToUpdate.map((type, i) => {
      if (type.label.length < 3) {
        setInfoMessage("Type label too short")
        return;
      }
      if (type.label.length > 19) {
        setInfoMessage("Type label too long")
        return;
      }
      form.append("label_" + i, type.label)
      form.append("color_" + i, type.color)
      form.append("id_" + i, type.id)
    })
    
    fetch("http://localhost/Eucleia/api/validateType.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( success => {
      setInfoMessage("Changes updated!")
    })

  }

  const onAddType = () => {
    // Id = -1 means it must be added, not updated
    setTypes([...types, {label: "", color: "", id: -1}])
    setTypesRef([...types, {label: "", color: "", id: -1}])

  }

  // On Initialization
  useEffect(() => {
    console.log("INIT")
    const form = new FormData();
    form.append("getTypes", true);

    fetch("http://localhost/Eucleia/api/validateType.php", {
      method: "POST",
      body: form
    })
    .then(res => {
      return res.json();
    })
    .then( typesDatabase => {
      setTypes(JSON.parse(JSON.stringify(typesDatabase)));
      setTypesRef(JSON.parse(JSON.stringify(typesDatabase)));
    })
  }, [])

  const onLabelChanged = (e, index) => {
    types[index].label = e.target.value;
  }
  const onColorChanged = (e, index) => {
    types[index].color = e.target.value;
  }


  return (
    <div id="Page">

      <h1>Options</h1>

      <h2>Types</h2>

      {types.map((t, index) => {
        return (
          <div key={index} className="option-type-container">
            <input type="text"  defaultValue={t.label} onChange={(e) => onLabelChanged(e, index)}/>
            <input type="color" defaultValue={t.color} onChange={(e) => onColorChanged(e, index)}/>
          </div>
        )
      })}

      <BaseButton label="Add Type" submit={false} callback={onAddType}/>

      <BaseButton label="Update Types" submit={false} callback={onUpdateTypes}/>

      <p>{infoMessage}</p>

    </div>
  )
}