import React from 'react'
import { connect } from 'react-redux'
import { doCreate } from '../reducers/anecdoteReducer'
import { notification } from '../utils'
import { doNotice, doNoticeClear } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'


const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    const newAnecdote = await anecdotesService.createNew(content)
    props.doCreate(newAnecdote)
    notification(props, `You created '${content}'`)
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


const mapDispatchToProps = {
  doCreate,
  doNotice,
  doNoticeClear
}


export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)