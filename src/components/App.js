import "./App.css";
import Display from "./Display";

import { useState } from "react";

import ButtonPad from "./ButtonPad";

let decimalExisted = false;

function App() {
  // use this state to update the value on display
  const [displayString, setDisplayString] = useState("0");
  const [lastCharacter, setLastCharacter] = useState("");
  const [signDisplay, setSignDisplay] = useState("");
  const [signValue, setSignValue] = useState(1);

  function handleButtonPress(buttonData) {
    switch (buttonData.type) {
      case "number":
        processNumberPress(buttonData.value);
        break;
      default:
      case "decimal":
        processDecimalPress(buttonData.value);
        break;
      case "sign":
        processSignPress();
        break;
      case "clear":
        processClearPress(buttonData.text);
        break;
    }

    function processNumberPress(number) {
      if (displayString === "0") {
        setDisplayString(`${number}`);
      } else {
        setDisplayString(`${displayString}${number}`);
      }
    }

    function processDecimalPress(decimal) {
      if (decimalExisted === false) {
        console.log(decimalExisted);
        setDisplayString(`${displayString}${decimal}`);
        decimalExisted = true;
        console.log(decimalExisted);
      } else {
        return;
      }
    }

    function processSignPress() {
      if (signDisplay === "") {
        if (displayString !== "0") {
          setSignDisplay("-");
          setSignValue(-1);
          setDisplayString(`-${displayString}`);
        }
      } else {
        setSignDisplay("");
        setSignValue(1);
        setDisplayString(displayString.substring(1));
      }
    }

    function processClearPress(clear) {
      if (clear === "AC") {
        setDisplayString("0");
      } else if (clear === "C") {
        if (displayString.length === 2 && signDisplay === "-") {
          setDisplayString("0");
          setSignDisplay("");
          setSignValue(1);
        } else if (displayString.length === 1) {
          setDisplayString("0");
        } else {
          setDisplayString(displayString.slice(0, -1));
        }
      }
    }
  }

  // const handleButtonClick = (value) => {
  //   setInputValue(prevValue => prevValue + value);
  // };
  return (
    <div className="App">
      <h1>React Calculator</h1>
      <div className="calculator-wrapper">
        {/* Display component */}
        <Display displayString={displayString} />

        {/* Buttons component */}
        <ButtonPad handleButtonPress={handleButtonPress} />
      </div>
    </div>
  );
}

export default App;
