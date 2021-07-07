import './App.css';
import './style/component.css';
import './style/style.css';

import MenuBar from './components/ui/MenuBar'

import BarChart from './components/d3/BarChart'

const dataX = [ 
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre"
];

const dataY = [ 
  800, 
  750, 
  222,
  550,
  119,
  31,
  112,
  551,
  496 
];

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <MenuBar />

        <BarChart
          width={1200}
          height={500} 
          dataX={dataX} 
          dataY={dataY} 
        />

        <BarChart
          width={750}
          height={300} 
          dataX={dataX} 
          dataY={dataY} 
        />  

      </header>
    </div>
  );
}

export default App;
