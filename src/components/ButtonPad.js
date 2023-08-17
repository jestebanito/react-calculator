import calculatorButtons from "../ButtonData/data/calculator-bonus-03-button-data";
import "./ButtonPad.css";

const ButtonPad = () => {
  return (

    <div className="numPad">
      {calculatorButtons.map(button => (
        <button
          key={button.className}
          className={`button ${button.className}`}
          type={button.type}
          // onClick={() => onButtonClick(button.value)}
        >
          {button.text}
        </button>
      ))}
    </div>
  )
}

export default ButtonPad;