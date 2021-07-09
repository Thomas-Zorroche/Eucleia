import './App.css';
import './style/component.css';
import './style/style.css';

import { React } from 'react'

import { MenuBar } from './components/ui/MenuBar'
import { HeaderBar } from './components/ui/HeaderBar'
import { Main } from './components/Main'


function App() {
  return (
    <div className="App">

      <header className="App-header"></header>

      <MenuBar />

      <HeaderBar />

      <Main />

    </div>
  );
}

export default App;
