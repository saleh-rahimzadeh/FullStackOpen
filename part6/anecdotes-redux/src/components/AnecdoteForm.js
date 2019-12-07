import React from 'react'
import { connect } from 'react-redux'
import { doCreate } from '../reducers/anecdoteReducer'
import { notification } from '../utils'
import { doNotice, doNoticeClear } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  const create = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    props.doCreate(content)
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