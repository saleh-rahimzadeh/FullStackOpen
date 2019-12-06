import React from 'react'
import { doVote } from '../reducers/anecdoteReducer'
import { notification } from '../utils'


const AnecdoteList = ({ store }) => {
  const { anecdotes } = store.getState()

  const vote = (id, content) => {
    store.dispatch(doVote(id))
    notification(store, `You voted '${content}'`)
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
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
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