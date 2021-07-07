import './App.css';
import './style/component.css';
import './style/style.css';

import MenuBar from './components/ui/MenuBar'

import BarChart from './components/d3/BarChart'

const data = [ 
  {x: "janvier", y:400}, 
  {x: "fevrier", y:750}, 
  {x: "mars", y:222},
  {x: "avril", y:550},
  {x: "mai", y:375},
  {x: "juin", y:451}  
];

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <MenuBar />

        <BarChart data={data} />

      </header>
    </div>
  );
}

export default App;
