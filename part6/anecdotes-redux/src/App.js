import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import { doVote } from './reducers/anecdoteReducer'


const App = ( { store }) => {
  const anecdotes = store.getState()

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
      <h2>Anecdotes</h2>
      {Display()}
      <h2>create new</h2>
      <AnecdoteForm store={store} />
    </div>
  )
}

export default App