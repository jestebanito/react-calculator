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
  // const [operatorDisplay, setOperatorDisplay] = useState("");
  // created a new state variable to track if an operation has been completed
  const [operationCompleted, setOperationCompleted] = useState(false);
  // created a memory state to store memory value
  const [memoryValue, setMemoryValue] = useState("0");

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
      case "memory":
        processMemoryPress(buttonData.text);
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

        // if (operator !== "%" && operator !== "\u221a") {
        //   setOperatorDisplay(operator);
        // }
        operatorExisted = true;
        // HANDLE PERCENTAGE
      } else if (operator === "%") {
        const lastCharIsOperator = "+-*/÷×".includes(lastCharacter);
        if (operatorExisted && !lastCharIsOperator) {
          // Replace Unicode division symbol with actual '/'
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");
          try {
            let result = saferEval(evaluatedString) / 100;
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
            let result = saferEval(newEvaluatedString) / 100;
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
            let result = saferEval(evaluatedString) / 100;
            setDisplayString(result);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }

          setOperationCompleted(true);
        }
        // HANDLE SQUARE ROOT
      } else if (operator === "\u221a") {
        const lastCharIsOperator = "+-*/÷×".includes(lastCharacter);
        if (operatorExisted && !lastCharIsOperator) {
          // Replace Unicode division symbol with actual '/'
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          try {
            console.log("enter step 1");
            let result = saferEval(evaluatedString);
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
            let result = saferEval(newEvaluatedString);
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
            let result = saferEval(evaluatedString);
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
    function saferEval(mathString) {
      const notValid = /[a-zA-Z|;]/g.test(mathString);
      if (notValid) {
        console.error("Invalid math string!");
        return "";
      }
      // The regex above helps to prevent malicious code from being executed
      // Using new Function() is safer than using eval(), but it is still not "safe"

      return new Function("return " + mathString)(); // eslint-disable-line no-new-func
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
          let result = saferEval(evaluatedString);
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
        // setOperatorDisplay("");
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

    function processMemoryPress(memory) {
      const lastCharIsOperator = "+-*/÷×".includes(lastCharacter);
      // Memory Store
      if (memory === "MS") {
        if (operatorExisted && !lastCharIsOperator) {
          // Replace Unicode division symbol with actual '/'
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          try {
            let result = saferEval(evaluatedString);
            let stringResult = result.toString();
            setMemoryValue(stringResult);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }
        } else if (operatorExisted && lastCharIsOperator) {
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          let newEvaluatedString = evaluatedString.slice(0, -3);

          try {
            setMemoryValue(newEvaluatedString);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }
        } else {
          // Replace Unicode division symbol with actual '/'

          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          try {
            setMemoryValue(evaluatedString);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }

          setOperationCompleted(true);
        }
        // Memory Clear
      } else if (memory === "MC") {
        setMemoryValue("0");
        // Memory Recall
      } else if (memory === "MR") {
        if (operatorExisted && lastCharIsOperator) {
          // check if there is there is one operator existed already eg: 10 +
          setDisplayString(`${displayString} ${memoryValue} `);
        } else {
          setDisplayString(memoryValue);
        }
        // Memory Plus
      } else if (memory === "M+") {
        if (operatorExisted && !lastCharIsOperator) {
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          try {
            let result = saferEval(evaluatedString) + saferEval(memoryValue);
            let stringResult = result.toString();
            setMemoryValue(stringResult);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }
        } else if (operatorExisted && lastCharIsOperator) {
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          let newEvaluatedString = evaluatedString.slice(0, -3);

          try {
            let result = saferEval(newEvaluatedString) + saferEval(memoryValue);
            let stringResult = result.toString();
            setMemoryValue(stringResult);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }
        } else {
          setMemoryValue(
            (prevMemoryValue) =>
              saferEval(prevMemoryValue) + saferEval(displayString)
          );
        }
        // Memory Subtract
      } else if (memory === "M-") {
        if (operatorExisted && !lastCharIsOperator) {
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          try {
            let result = saferEval(memoryValue) - saferEval(evaluatedString);
            let stringResult = result.toString();
            setMemoryValue(stringResult);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }
        } else if (operatorExisted && lastCharIsOperator) {
          console.log(operatorExisted);
          console.log(lastCharIsOperator);
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          let newEvaluatedString = evaluatedString.slice(0, -3);

          try {
            let result = saferEval(memoryValue) - saferEval(newEvaluatedString);
            let stringResult = result.toString();
            setMemoryValue(stringResult);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }
        } else {
          setMemoryValue(
            (prevMemoryValue) =>
              saferEval(prevMemoryValue) - saferEval(displayString)
          );
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
