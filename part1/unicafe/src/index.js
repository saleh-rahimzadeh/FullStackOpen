/*
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#  Created by Saleh Rahimzadeh                                                 #
#  Copyright (C) 2019                                                          #
#  https://saleh.sleek.page                                                    #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
*/

import React, { useState } from 'react'
import ReactDOM            from 'react-dom'

console.log('Part1: 9')
console.log(`Starting Application [${(new Date()).toLocaleTimeString()}]`)



/* Statistics Component */
const Statistics = (props) => {

  /* Functions */
  const calculateAll = () => {
    return props.good + props.neutral + props.bad
  }

  const calculatePositive = () => {
    const all = calculateAll()
    return all === 0 ? 0 : props.good * 100 / all
  }

  const calculateAverage = () => {
    const all = calculateAll()
    return all === 0 ? 0 : (props.good + (props.bad * -1)) / all
  }


  /* Rendering Statistics */
  if (calculateAll() === 0) {
    return (
      <p>No feedback given.</p>
    )
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <p>
          Good: {props.good}
          <br />
          Neutral: {props.neutral}
          <br />
          Bad: {props.bad}
          <br />
          All: {calculateAll()}
          <br />
          Average: {calculateAverage()}
          <br />
          Positive: {calculatePositive()} %
        </p>
      </>
    )
  }

}



/* App Component */
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
      <h1>unicafe</h1>

      <h2>Give feedback</h2>
      <button onClick={setGoodHandler}>
        Good
      </button>
      <button onClick={setNeutralHandler}>
        Neutral
      </button>
      <button onClick={setBadHandler}>
        Bad
      </button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )

}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)