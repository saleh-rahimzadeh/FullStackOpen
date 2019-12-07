import React from 'react'
import { connect } from 'react-redux'
import { doVote } from '../reducers/anecdoteReducer'
import { notification } from '../utils'



const AnecdoteList = (props) => {
  const vote = (id, content) => {
    props.store.dispatch(doVote(id))
    notification(props.store, `You voted '${content}'`)
  }

  const Display = () => {
    return props.anecdotes
      .sort((first, second) => second.votes - first.votes)
      .filter(item => props.filter === '' ? true : item.content.toUpperCase().includes(props.filter.toUpperCase()))
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



const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}



export default connect(
  mapStateToProps,
  null
)(AnecdoteList)