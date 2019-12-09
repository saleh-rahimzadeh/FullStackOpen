import React from 'react'
import { connect } from 'react-redux'
import { doVote } from '../reducers/anecdoteReducer'
import { notification } from '../utils'
import { doNotice, doNoticeClear } from '../reducers/notificationReducer'



const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.doVote(anecdote)
    notification(props, `You voted '${anecdote.content}'`)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}


const toDisplay = ({ anecdotes, filter }) => {
  return anecdotes
    .sort((first, second) => second.votes - first.votes)
    .filter(item => filter === '' ? true : item.content.toUpperCase().includes(filter.toUpperCase()))
}



const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: toDisplay(state)
  }
}

const mapDispatchToProps = {
  doVote,
  doNotice,
  doNoticeClear
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)