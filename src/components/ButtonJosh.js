

const ButtonJosh = ({buttonData, handleButtonPress}) => {


  return (
    <button onClick={() => handleButtonPress(buttonData)}>{buttonData.text}</button>
  )
}

export default ButtonJosh