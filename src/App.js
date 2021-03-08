import Weather2 from './Weather2';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main card">
          <Weather2 city="Paris" country="FR" temp={3} hum={20} wind={23}/>
        </div>
      </header>
      <footer>
        <p className="coder">
          <a href="https://github.com/lucero-cardenas/my-app" target="_blank" rel="noreferrer">Open source code</a>
          {" "}by{" "}
          <a href="mailto:lucero.cardenas@gmail.com" target="_blank" rel="noreferrer">Lucero Cardenas</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
