//import logo from './logo.svg';
import sanitationLogo from './cityLA-logo-website.jpg' //you have to import using this logo import for react
import './App.css';
import { GithubLogo } from './GithubLogo';
import { Parser } from './DataParser';
import { Exorter } from './ExportData';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <GithubLogo/>
        <img src={sanitationLogo} className="App-logo" alt="lasan-logo.jpg" />
        <h1>LASAN Robocaller Data Upload</h1>
      </header>
      <Parser/>

    </div>

  );
}

export default App;
