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
  const [operatorDisplay, setOperatorDisplay] = useState("");

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
      case "operator":
        processOperatorPress(buttonData.text);
        break;
      case "enter":
        processEnterPress(buttonData.text);
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

    function processOperatorPress(operator) {
    // Add the operator to the displayString
    if (buttonData.type === "operator") {
      setDisplayString(`${displayString}${operator}`);
      if(operator != "%" && operator != "\u221a") {
        setOperatorDisplay(operator);
      }
      }
      if (operator === '\u221a') {
        setDisplayString(displayString.slice(0, -1) + operator);
      }
    }

    function processEnterPress(enter) {
      if (enter === "=") {
        // Replace Unicode division symbol with actual '/'
        let evaluatedString = displayString
        .replace(/\u00f7/g, '/')
        .replace(/\u00d7/g, '*')
        // Check if square root operator is present
        if (evaluatedString.includes('\u221a')) {
          evaluatedString = evaluatedString.replace(/\u221a/g, 'Math.sqrt(') + ')';
        }
        // Check if percent symbol is present
        if (evaluatedString.includes('%')) {
          // Create variable to set evaluatedString to the formula on line 91 OUTSIDE of the arrow function scope
          let tempEvaluatedString = evaluatedString;
          // Check if percent symbol is present after a number
          const percentRegex = /(\d+)\s*%/g;
          evaluatedString = evaluatedString.replace(percentRegex, (_, num, index, input) => {
            const percentage = parseInt(num, 10) * 0.01;
            const precedingNumber = parseFloat(input.substring(0, index));
            tempEvaluatedString = `(${precedingNumber} ${operatorDisplay} (${precedingNumber} * ${percentage}))`;
            return '';
          });
          evaluatedString = tempEvaluatedString;
        }
        try {
          console.log(evaluatedString)
          let result = eval(evaluatedString);
          setDisplayString(result);
        } catch (error) {
          // Handle any evaluation errors
          setDisplayString("Error");
          console.log(error);
        }
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
