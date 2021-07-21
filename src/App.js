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

      <HeaderBar />
      
      <div id="Container-App">
        <MenuBar />
        <Main />
      </div>

    </div>
  );
}

export default App;
