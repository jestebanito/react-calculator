import "./App.css";
import Display from "./Display";

import { useState } from "react";

import ButtonPad from "./ButtonPad";


let operatorExisted = false;

function App() {
  // use this state to update the value on display
  const [displayString, setDisplayString] = useState("0");
  const [lastCharacter, setLastCharacter] = useState("");
  const [signDisplay, setSignDisplay] = useState("");
  const [signValue, setSignValue] = useState(1);
  const [operatorDisplay, setOperatorDisplay] = useState("");
  // created a new state variable to track if an operation has been completed
  const [operationCompleted, setOperationCompleted] = useState(false);

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
      // Added an if statement for when an operation is completed
      if (operationCompleted && operatorExisted) {
        setDisplayString(`${displayString} ${number} `);
      } else if (operationCompleted) {
        setDisplayString(`${number}`);
        setOperationCompleted(false); // Reset operationCompleted
      } else if (displayString === "0") {
        setDisplayString(`${number}`);
      } else {
        setDisplayString(`${displayString}${number}`);
      }
      setLastCharacter(number);
    }


    function processDecimalPress(decimal) {
      // Check if the last character in the displayString is an operator
      const lastCharIsOperator = "+-*/%√".includes(lastCharacter);

      // Check if a decimal point already exists in the current number
      const decimalPointAlreadyExists = displayString.includes(".");
      if (!decimalPointAlreadyExists || lastCharIsOperator) {
        // If there's no decimal point in the current number or the last character is an operator,
        // you can add the decimal point.
        setDisplayString(`${displayString}${decimal}`);
        setLastCharacter(decimal);
      }
    }

    function processOperatorPress(operator) {
      if (!operatorExisted && operator !== "%" && operator !== "\u221a") {
        setDisplayString(`${displayString} ${operator} `);
        setLastCharacter(operator);
        // setOperationCompleted(false);
        if (operator !== "%" && operator !== "\u221a") {
          setOperatorDisplay(operator);
        }
        operatorExisted = true;
      } else if (operator === "%") {
        const lastCharIsOperator = "+-*/%√".includes(lastCharacter);
        if (operatorExisted && !lastCharIsOperator) {
          // Replace Unicode division symbol with actual '/'
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");
          try {
            let result = eval(evaluatedString) / 100;
            setDisplayString(result);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }

          setOperationCompleted(true);
        } else if (operatorExisted && lastCharIsOperator) {
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");
          let newEvaluatedString = evaluatedString.slice(0, -2);
          console.log(newEvaluatedString);
          try {
            let result = eval(newEvaluatedString) / 100;
            setDisplayString(result);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }

          setOperationCompleted(true);
        } else {
          // Replace Unicode division symbol with actual '/, *'
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");
          try {
            let result = eval(evaluatedString) / 100;
            setDisplayString(result);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }

          setOperationCompleted(true);
        }
      } else if (operator === "\u221a") {
        const lastCharIsOperator = "+-*/%√".includes(lastCharacter);
        if (operatorExisted && !lastCharIsOperator) {
          // Replace Unicode division symbol with actual '/'
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          try {
            console.log("enter step 1");
            let result = eval(evaluatedString);
            console.log(result);
            let resultAfterSquareRoot = Math.sqrt(result);
            setDisplayString(resultAfterSquareRoot);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }

          setOperationCompleted(true);
        } else if (operatorExisted && lastCharIsOperator) {
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          let newEvaluatedString = evaluatedString.slice(0, -2);
          console.log(newEvaluatedString);
          try {
            let result = eval(newEvaluatedString);
            let resultAfterSquareRoot = Math.sqrt(result);
            setDisplayString(resultAfterSquareRoot);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }

          setOperationCompleted(true);
        } else {
          // Replace Unicode division symbol with actual '/'

          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          try {
            let result = eval(evaluatedString);
            let resultAfterSquareRoot = Math.sqrt(result);
            setDisplayString(resultAfterSquareRoot);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }

          setOperationCompleted(true);
        }
      }
    }

    function processEnterPress(enter) {
      if (enter === "=") {
        operatorExisted = false;
        // Replace Unicode division symbol with actual '/'
        let evaluatedString = displayString
          .toString()
          .replace(/\u00f7/g, "/")
          .replace(/\u00d7/g, "*");
        try {
          console.log(evaluatedString);
          let result = eval(evaluatedString);
          setDisplayString(result);
        } catch (error) {
          // Handle any evaluation errors
          setDisplayString("Error");
          console.log(error);
        }
        // Set the boolean value to true if enter === "="
        setOperationCompleted(true);
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
        operatorExisted = false;
        setOperationCompleted(false);
        setSignDisplay("");
        setSignValue(1);
        setOperatorDisplay("");
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
