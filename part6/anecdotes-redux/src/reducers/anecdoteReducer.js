import anecdotesService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(item => item.id === id)
      const newAnecdote = {
        ...anecdote,
        votes: action.data.votes
      }
      return state.map(item => 
        item.id !== id ? item : newAnecdote
      )
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}


export const doCreate = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const doVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const newAnecdote = await anecdotesService.vote(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: {
        id: newAnecdote.id,
        votes: newAnecdote.votes
      }
    })
  }
}

export const doInitialize = () => {
  return async dispatch => {
    const items = await anecdotesService.getAll()
    dispatch({
      type: 'INIT',
      data: items
    })
  }
}


export default anecdoteReducer