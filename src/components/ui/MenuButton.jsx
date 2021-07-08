import { React, useState, useEffect } from 'react'

export const MenuButton = ({ active, label, onActiveChanged }) => {

  const [_active, setActive] = useState(false);

  useEffect(() => {
    setActive(active);
  }, [])

  useEffect(() => {
    setActive(active);
  }, [active])

  const click = () => {
    onActiveChanged(label);
    setActive(true)
  }

  return (
    <li 
      className={_active ? "menuButtonActive" : "menuButton"}
      onClick={click}>
      {label}
    </li>
  )
}