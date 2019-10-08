/*
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#  Created by Saleh Rahimzadeh                                                 #
#  Copyright (C) 2019                                                          #
#  https://saleh.sleek.page                                                    #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
*/

import React, { useState } from 'react'
import ReactDOM            from 'react-dom'

console.log('Part1: 11')
console.log(`Starting Application [${(new Date()).toLocaleTimeString()}]`)



/* Statistic Component
------------------------------------------------------------------------------- */
const Statistic = ({ title, value }) => {

  /* Rendering Statistic */
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  )

}



/* Statistics Component
------------------------------------------------------------------------------- */
const Statistics = ({ good, neutral, bad }) => {

  /* Functions */
  const calculateAll = () => {
    return good + neutral + bad
  }

  const calculatePositive = () => {
    const all = calculateAll()
    return all === 0 ? 0 : good * 100 / all
  }

  const calculateAverage = () => {
    const all = calculateAll()
    return all === 0 ? 0 : (good + bad * -1) / all
  }


  /* Rendering Statistics */
  if (calculateAll() === 0) {
    return (
      <p>No feedback given.</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <Statistic title="Good"     value={good} />
          <Statistic title="Neutral"  value={neutral} />
          <Statistic title="Bad"      value={bad} />
          <Statistic title="All"      value={calculateAll()} />
          <Statistic title="Average"  value={calculateAverage()} />
          <Statistic title="Positive" value={calculatePositive() + ' %'} />
        </tbody>
      </table>
    )
  }

}



/* Button Component
------------------------------------------------------------------------------- */
const Button = ({ title, eventHandler }) => {

  /* Rendering Button */
  return (
    <button onClick={eventHandler}>
      {title}
    </button>
  )

}



/* Buttons Component
------------------------------------------------------------------------------- */
const Buttons = ( { goodEventHandler, neutralEventHandler, badEventHadler } ) => {

  /* Rendering Buttons */
  return (
    <div>
      <Button title="Good"    eventHandler={goodEventHandler} />
      <Button title="Neutral" eventHandler={neutralEventHandler} />
      <Button title="Bad"     eventHandler={badEventHadler} />
    </div>
  )

}



/* App Component
------------------------------------------------------------------------------- */
const App = () => {

  /* States */
  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)


  /* Event handlers */
  const setGoodHandler = () => {
    setGood(good + 1)
  }

  const setNeutralHandler = () => {
    setNeutral(neutral + 1)
  }

  const setBadHandler = () => {
    setBad(bad + 1)
  }


  /* Rendering Application */
  console.log('Rendering Application...')

  return (
    <>
      <h1>[ unicafe ]</h1>

      <h2>Give feedback</h2>
      <Buttons 
        goodEventHandler={setGoodHandler} 
        neutralEventHandler={setNeutralHandler} 
        badEventHadler={setBadHandler} 
      />

      <h2>Statistics</h2>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
      />
    </>
  )

}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)