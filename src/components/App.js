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
        setDisplayString(`${displayString}${number}`);
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
      let lastCharIsOperator = "+-%√÷×".includes(lastCharacter);
      const lastCharIsNumber = "0123456789".includes(lastCharacter);

      if (operationCompleted && lastCharIsOperator) {
        setDisplayString(`${displayString}0${decimal}`);
        setOperationCompleted(false);
        return;
      } else if (operationCompleted && lastCharIsNumber) {
        setDisplayString(`${displayString}${decimal}`);
        setOperationCompleted(false);
      } else if (operationCompleted) {
        setDisplayString(`0.`);
        setOperationCompleted(false);
        return;
      }

      // Check if a decimal point already exists in the current number
      const decimalPointAlreadyExists = displayString.includes(".");
      if (!decimalPointAlreadyExists || lastCharIsOperator) {
        // If a decimal point already exists in the current number and the last character is an operator,
        // do nothing when trying to add another decimal point.
        setDisplayString(`${displayString}${decimal}`);
        setLastCharacter(decimal);
      } else if (lastCharIsNumber) {
        // If the last character is a number, check if the current number contains a decimal point.
        // If it does, do nothing; otherwise, add the decimal point.
        const numberParts = displayString.split(/[-+*/%√÷×]/); // Split by operators
        const currentNumber = numberParts[numberParts.length - 1];
        if (!currentNumber.includes(".")) {
          setDisplayString(`${displayString}${decimal}`);
          setLastCharacter(decimal);
        }
      } else if (lastCharIsNumber && !decimalPointAlreadyExists) {
        // If the last character is a number and there's no decimal point in the current number,
        // add the decimal point.
        setDisplayString(`${displayString}${decimal}`);
        setLastCharacter(decimal);
      }
    }

    function processOperatorPress(operator) {
      if (!operatorExisted && operator !== "%" && operator !== "\u221a") {
        setDisplayString(`${displayString}${operator}`);
        setLastCharacter(operator);

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
          let newEvaluatedString = evaluatedString.slice(0, -1);

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
          // Replace Unicode division symbol with actual '/, *'
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
        } else if (operatorExisted && lastCharIsOperator) {
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          let newEvaluatedString = evaluatedString.slice(0, -1);

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
          // Replace Unicode division symbol with actual '/, *'

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
        // Replace Unicode division symbol with actual '/, *'
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
        }
        // Set the boolean value to true if enter === "="
        setOperationCompleted(true);
      }
    }

    function processSignPress() {
      const lastCharIsOperator = "+-*/÷×".includes(lastCharacter);
      if (operatorExisted && !lastCharIsOperator && signDisplay === "-") {
        let removedString = displayString.slice(4);
        setDisplayString(removedString);
        setSignDisplay("");
      } else if (operatorExisted && !lastCharIsOperator) {
        setDisplayString(`-1\u00d7 ${displayString}`);
        setSignDisplay("-");
      } else if (signDisplay === "") {
        if (displayString !== "0") {
          setSignDisplay("-");

          setDisplayString(`-${displayString}`);
        }
      } else {
        setSignDisplay("");

        setDisplayString(displayString.substring(1));
      }
    }

    function processClearPress(clear) {
      if (clear === "AC") {
        setDisplayString("0");
        operatorExisted = false;
        setOperationCompleted(false);
        setSignDisplay("");
        setLastCharacter("");
      } else if (clear === "C") {
        const lastCharIsOperator = "+-*/÷×".includes(lastCharacter);
        let newDisplayString = displayString.toString();

        if (newDisplayString.length === 2 && signDisplay === "-") {
          setDisplayString("0");
          setSignDisplay("");
          setLastCharacter("");
        } else if (newDisplayString.length === 1) {
          setDisplayString("0");
          setLastCharacter("");
        } else if (lastCharacter === lastCharIsOperator) {
          setDisplayString(newDisplayString.slice(0, -1));
          operatorExisted = false;
          setLastCharacter("");
        } else {
          operatorExisted = false;
          setDisplayString(newDisplayString.slice(0, -1));
          setLastCharacter(newDisplayString.slice(-2, -1));
        }
      }
    }

    function processMemoryPress(memory) {
      const lastCharIsOperator = "+-*/÷×".includes(lastCharacter);
      // Memory Store
      if (memory === "MS") {
        if (operatorExisted && !lastCharIsOperator) {
          // Replace Unicode division symbol with actual '/, *'
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

          let newEvaluatedString = evaluatedString.slice(0, -1);

          try {
            setMemoryValue(newEvaluatedString);
          } catch (error) {
            // Handle any evaluation errors
            setDisplayString("Error");
          }
        } else {
          // Replace Unicode division symbol with actual '/, *'

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
          setDisplayString(`${displayString}${memoryValue}`);
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

          let newEvaluatedString = evaluatedString.slice(0, -1);

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
          let evaluatedString = displayString
            .toString()
            .replace(/\u00f7/g, "/")
            .replace(/\u00d7/g, "*");

          let newEvaluatedString = evaluatedString.slice(0, -1);

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
