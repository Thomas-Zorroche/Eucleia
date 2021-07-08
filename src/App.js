import './App.css';
import './style/component.css';
import './style/style.css';

import { React } from 'react'

import { MenuBar } from './components/ui/MenuBar'
import { Main } from './components/Main'


function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <MenuBar />
      <Main />
    </div>
  );
}

export default App;
