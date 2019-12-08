const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const ancedote = state.find(item => item.id === id)
      const newAncedote = { 
        ...ancedote, 
        votes: ancedote.votes + 1
      }
      return state.map(item => 
        item.id !== id ? item : newAncedote
      )
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
    default:
      return state
  }
}


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const doCreate = (content) => {
  return {
    type: 'CREATE',
    data: asObject(content)
  }
}

export const doVote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const doInitialize = (items) => {
  return {
    type: 'INIT',
    data: items
  }
}


export default anecdoteReducer