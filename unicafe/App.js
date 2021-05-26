import React, {useState} from 'react';

const Button = (props) => {
  return(
  <button onClick={props.onClick}>{props.text}</button>
  )
  }
const Statistic = (props) => {
  return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <Statistic text="good" value ={props.good} />
          <Statistic text="neutral" value ={props.neutral} />
          <Statistic text="bad" value ={props.bad} />
          <Statistic text="all" value ={props.total} />
          <Statistic text="average" value ={(props.good -props.bad) / props.total} />
          <Statistic text="positive" value ={(props.good /props.total * 100) + ' %'}  />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {setTotal(total + 1); setGood(good +1);}
  const handleNeutralClick = () => {setTotal(total + 1); setNeutral(neutral +1);}
  const handleBadClick = () => {setTotal(total + 1); setBad(bad +1);}

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics total={total} good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App
