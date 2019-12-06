export const doNotice = message => {
  return {
    type: 'NOTICE',
    message
  }
}

export const doNoticeClear = () => {
  return {
    type: "NOTICE_CLEAR"
  }
}


const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTICE':
      return action.message
    case 'NOTICE_CLEAR':
      return ''
    default:
      return state
  }
}


export default notificationReducer