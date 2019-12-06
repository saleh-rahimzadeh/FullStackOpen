import React from 'react'
import { doVote } from '../reducers/anecdoteReducer'


const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState()

  const vote = (id) => {
    store.dispatch(doVote(id))
  }

  const Display = () => {
    return anecdotes
      .sort((first, second) => second.votes - first.votes)
      .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
  }


  return (
    <div>
      {Display()}
    </div>
  )
}


export default AnecdoteList