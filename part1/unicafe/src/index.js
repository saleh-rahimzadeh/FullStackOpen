/*
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#  Created by Saleh Rahimzadeh                                                 #
#  Copyright (C) 2019                                                          #
#  https://saleh.sleek.page                                                    #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
*/

import React, { useState } from 'react'
import ReactDOM            from 'react-dom'

console.log('Part1: 7')
console.log(`Starting Application [${(new Date()).toLocaleTimeString()}]`)



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
    return all === 0 ? 0 : (good + (bad * -1)) / all
  }


  /* Rendering */
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

      <h2>Statistics</h2>
      <p>
        Good: {good}
        <br />
        Neutral: {neutral}
        <br />
        Bad: {bad}
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



ReactDOM.render(
  <App />,
  document.getElementById('root')
)