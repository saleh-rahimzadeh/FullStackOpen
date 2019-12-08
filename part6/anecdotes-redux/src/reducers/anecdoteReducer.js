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


export const doCreate = (content) => {
  return {
    type: 'CREATE',
    data: content
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