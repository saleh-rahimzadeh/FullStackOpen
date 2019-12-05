import React from 'react';
import { asObject } from './reducers/anecdoteReducer'


const App = ( { store }) => {
  const anecdotes = store.getState()

  const vote = (id) => {
    store.dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    store.dispatch({
      type: 'CREATE',
      data: asObject(content)
    })
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