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

        <Parser1 />

      </header>
    </div>
  );
}

export default App;
