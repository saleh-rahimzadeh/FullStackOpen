/*
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#  Created by Saleh Rahimzadeh                                                 #
#  Copyright (C) 2019                                                          #
#  https://saleh.sleek.page                                                    #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
*/

import React, { useState } from 'react'
import ReactDOM            from 'react-dom'

console.log('Part1: 14')
console.log(`Starting Application [${(new Date()).toLocaleTimeString()}]`)



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



/* MostVisited Component
------------------------------------------------------------------------------- */
const MostVisited = ( {anecdotes, votes} ) => {
  let position = votes.indexOf(Math.max.apply(Math, votes))

  return (
    <>
      <p>
        {anecdotes[position]}
      </p>
      <p>
        has {votes[position]} vote{votes[position] > 1 ? 's' : ''}
      </p>
    </>
  )

}



/* App Component
------------------------------------------------------------------------------- */
const App = (props) => {

  /* States */
  const [selected, setSelected] = useState(0)
  const [votes, setVotes]       = useState(new Array(props.anecdotes.length).fill(0))


  /* Event handlers */
  const selectAnecdote = () => {
    let num = 0
    do {
      num = Math.floor(Math.random() * props.anecdotes.length)
    } while (num === 6)
    console.log('Random Number:', num)

    setSelected(num)    
  }

  const doVote = () => {
    let clone = [...votes]
    clone[selected] += 1
    setVotes(clone)
  }


  /* Rendering Application */
  console.log('Rendering Application...')

  return (
    <>
      <h1>[ anecdotes ]</h1>

      <h2>Anecdote of the day</h2>
      <p>
        {props.anecdotes[selected]}
      </p>
      <p>
        has {votes[selected]} vote{votes[selected] > 1 ? 's' : ''}
      </p>
      <button onClick={selectAnecdote}>
        Next Anecdote
      </button>
      <button onClick={doVote}>
        Vote
      </button>

      <h2>Anecdote with most votes</h2>
      <MostVisited anecdotes={anecdotes} votes={votes} />
    </>
  )

}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)