import React from 'react'
import { doCreate } from '../reducers/anecdoteReducer'


const AnecdoteForm = ({ store }) => {
  const create = (event) => {
    event.preventDefault()
    store.dispatch(doCreate(event.target.content.value))
    event.target.content.value = ''
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="content"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm