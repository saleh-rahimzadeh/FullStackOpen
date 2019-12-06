import React from 'react';
import { doCreate, doVote } from './reducers/anecdoteReducer'


const App = ( { store }) => {
  const anecdotes = store.getState()

  const vote = (id) => {
    store.dispatch(doVote(id))
  }

  const create = (event) => {
    event.preventDefault()
    store.dispatch(doCreate(event.target.content.value))
    event.target.content.value = ''
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
      <h2>Anecdotes</h2>
      {Display()}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App