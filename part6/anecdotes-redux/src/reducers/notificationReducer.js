export const doNotice = message => {
  return {
    type: 'NOTICE',
    message
  }
}


const notificationReducer = (state = 'Hello', action) => {
  switch (action.type) {
    case 'NOTICE':
      return action.message
    default:
      return state
  }
}


export default notificationReducer