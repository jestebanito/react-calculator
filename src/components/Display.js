function Display({displayString}) {
  return (
    <div className="box">
      <div className="display"> 
        <p className="calculation-display">{displayString}</p>
      </div>
    </div>
  )
}

export default Display