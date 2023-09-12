//import logo from './logo.svg';
import sanitationLogo from './cityLA-logo-website.jpg' //you have to import using this logo import for react
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={sanitationLogo} className="App-logo" alt="lasan-logo.jpg" />

        <h1>This is Nick's ReactApp LASAN react.</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
