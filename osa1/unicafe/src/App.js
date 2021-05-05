import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.value[0] + props.value[1] + props.value[2] === 0){
    return <p>No feedback given</p>
  }
  return (
    <table>
      <StatisticLine text="good" value={props.value[0]}  />
      <StatisticLine text="neutral" value={props.value[1]} />
      <StatisticLine text="bad" value={props.value[2]} />
      <StatisticLine text="all" value={props.value[0] + props.value[1] + props.value[2]} />
      <StatisticLine text="average" value={(props.value[0] - props.value[2])/(props.value[0] + props.value[1] + props.value[2])} />
      <StatisticLine text="positive" value={(props.value[0])/(props.value[0] + props.value[1] + props.value[2]) * 100} symbol="%" />
    </table>
  )
  
}

const StatisticLine = props => <tr><td>{props.text}</td> <td>{props.value} {props.symbol}</td></tr> 
  
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text} </button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () =>{
    setGood(good + 1)
    setNeutral(neutral)
    setBad(bad)
  }

  const addNeutral = () =>{
    setGood(good)
    setNeutral(neutral + 1)
    setBad(bad)
  }

  const addBad = () =>{
    setGood(good)
    setNeutral(neutral)
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>      

      <Button handleClick={() => addGood()} text="good" />
      <Button handleClick={() => addNeutral()} text="neutral" />
      <Button handleClick={() => addBad()} text="bad" />

      <h1>statistics</h1>
      
      <Statistics name="all" value={[good , neutral , bad]}/>
      
    </div>
  )
}

export default App