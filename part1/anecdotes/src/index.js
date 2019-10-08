/*
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#  Created by Saleh Rahimzadeh                                                 #
#  Copyright (C) 2019                                                          #
#  https://saleh.sleek.page                                                    #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
*/

import React, { useState } from 'react'
import ReactDOM            from 'react-dom'

console.log('Part1: 12')
console.log(`Starting Application [${(new Date()).toLocaleTimeString()}]`)



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



/* App Component
------------------------------------------------------------------------------- */
const App = (props) => {

  /* State */
  const [selected, setSelected] = useState(0)


  /* Event handler */
  const selectAnecdote = () => {
    let num = 0
    do {
      num = Math.floor(Math.random() * anecdotes.length)
    } while (num === 6)
    console.log('Random Number:', num)

    setSelected(num)    
  }


  /* Rendering Application */
  console.log('Rendering Application...')

  return (
    <div>
      <button onClick={selectAnecdote}>
        Next Anecdote
      </button>
      <p>
        {props.anecdotes[selected]}
      </p>
    </div>
  )

}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)