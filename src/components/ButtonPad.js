import calculatorButtons from "../ButtonData/data/calculator-bonus-03-button-data";
import "./ButtonPad.css";

const ButtonPad = ({handleButtonPress}) => {
  return (

    <div className="numPad">
      {calculatorButtons.map(buttonData => (
        <button
          key={buttonData.className}
          className={`button ${buttonData.className}`}
          type={buttonData.type}
          onClick={() => handleButtonPress(buttonData)}
        >
          {buttonData.text}
        </button>
      ))}
    </div>
  )
}

export default ButtonPad;