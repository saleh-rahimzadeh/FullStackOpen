import React from 'react'
import { connect } from 'react-redux'
import { doCreate } from '../reducers/anecdoteReducer'
import { doNotice, doNoticeClear } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    
    props.doCreate(content)
    props.doNotice(`You created '${content}'`, 5, props.doNoticeClear)
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