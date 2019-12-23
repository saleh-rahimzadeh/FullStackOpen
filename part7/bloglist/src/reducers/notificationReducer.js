const initialState = {
  message: '',
  isError: false
}


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTICE_SUCCESS':
      return {
        message: action.message,
        isError: false
      }
    case 'NOTICE_ERROR':
      return {
        message: action.message,
        isError: true
      }
    case 'NOTICE_CLEAR':
      return {...initialState}
    default:
      return state
  }
}


export const doNoticeSuccess = (message) => {
  return async dispatch => {
    dispatch({
      type: 'NOTICE_SUCCESS',
      message
    })
    setTimeout(() => { 
        dispatch({
            type: 'NOTICE_CLEAR',
        }) 
      }, 
      5000
    )
  }
}

export const doNoticeError = (message) => {
  return async dispatch => {
    dispatch({
      type: 'NOTICE_ERROR',
      message
    })
    setTimeout(() => { 
        dispatch({
            type: 'NOTICE_CLEAR',
        }) 
      }, 
      5000
    )
  }
}
  
export const doNoticeClear = () => (
  {
      type: "NOTICE_CLEAR"
  }
)
  

export default notificationReducer