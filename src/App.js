//import logo from './logo.svg';
import sanitationLogo from './cityLA-logo-website.jpg' //you have to import using this logo import for react
import './App.css';
import { GithubLogo } from './GithubLogo';
import { Parser1 } from './components';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GithubLogo/>
        <img src={sanitationLogo} className="App-logo" alt="lasan-logo.jpg" />

        <h1>LASAN Robocaller Csv Parser react.</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Parser1 />

        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React test
        </a>



      </header>
    </div>
  );
}

export default App;
