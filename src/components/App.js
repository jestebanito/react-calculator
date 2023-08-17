import './App.css';
import Display from './Display';

function App() {
  return (
    <div className="App">
        <h1>React Calculator</h1>
      <div className="calculator-wrapper">
        {/* Display component */}
        <Display />
        {/* Buttons component */}
      </div>

    </div>
  );
}

export default App;
