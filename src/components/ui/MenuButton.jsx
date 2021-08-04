import { React, useState, useEffect } from 'react'

export const MenuButton = ({ active, label, icon, onActiveChanged }) => {

  const [_active, setActive] = useState(false);

  useEffect(() => {
    setActive(active);
  }, [active])

  useEffect(() => {
    setActive(active);
  }, [active])

  const click = () => {
    onActiveChanged(label);
    setActive(true)
  }

  return (
    <li className={_active ? "menuButton menuButtonActive" : "menuButton"} onClick={click}>
      <img className="icon" src={icon} width="26" height="26" alt="home"/>
      {label}
    </li>
  )
}