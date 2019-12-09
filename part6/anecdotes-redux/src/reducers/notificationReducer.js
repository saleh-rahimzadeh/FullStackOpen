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


export const doNotice = (message, timer, propsDoNoticeClear) => {
  return async dispatch => {
    setTimeout(() => { propsDoNoticeClear() }, timer * 1000)
    dispatch({
      type: 'NOTICE',
      message
    })
  }
}

export const doNoticeClear = () => {
  return async dispatch => {
    dispatch({
      type: "NOTICE_CLEAR"
    })
  }
}


export default notificationReducer