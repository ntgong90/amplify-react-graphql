//import logo from './logo.svg';
import sanitationLogo from './cityLA-logo-website.jpg' //you have to import using this logo import for react
import './App.css';
import { GithubLogo } from './GithubLogo';
import {useState} from "react";
import { Parser } from './DataParser';

function App() {
  const [exportData, setExportData] = useState([]);

    //debugging method
    function consoleLogFile() {
      console.log(exportData);
      }

      const sendDataToParent = (index) => {
        console.log(index);
        setExportData(index);
      }

  return (
    <div className="App">
      <header className="App-header">
        <GithubLogo/>
        <img src={sanitationLogo} className="App-logo" alt="lasan-logo.jpg" />
        <h1>LASAN Robocaller Data Upload</h1>
      </header>
      <Parser passExportData={sendDataToParent}/>
              {/* This button is for debugging */}
      <button className="button1" id='displayDataButton' onClick={consoleLogFile}>
            Display Child Data
          </button>
    </div>

  );
}

export default App;
