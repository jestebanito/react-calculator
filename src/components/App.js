import { calculatorButtons } from "../ButtonData/data/calculator-bonus-03-button-data";
import "./App.css";
import Display from "./Display";
import ButtonJosh from "./ButtonJosh";

import { useState } from "react";


function App() {
  // use this state to update the value on display
  const [displayString, setDisplayString] = useState("0");

  function handleButtonPress(number) {
  
    setDisplayString(displayString + number);
  }

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <div className="calculator-wrapper">
        {/* Display component */}
        <Display displayString={displayString}/>
        {/* Buttons component */}
        {calculatorButtons.map((buttonData, index) =>  (
            <ButtonJosh key={index} buttonData={buttonData} handleButtonPress={handleButtonPress}/>
          ))}
      </div>
    </div>
  );
}

export default App;
