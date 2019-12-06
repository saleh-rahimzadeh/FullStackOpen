import React from 'react'
import { doCreate } from '../reducers/anecdoteReducer'
import { notification } from '../utils'


const AnecdoteForm = ({ store }) => {
  const create = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    store.dispatch(doCreate(content))
    notification(store, `You created '${content}'`)
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