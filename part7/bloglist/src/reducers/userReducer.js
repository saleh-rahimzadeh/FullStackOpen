const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SAVE':
    return action.data
  case 'CLEAR':
    return null
  default:
    return state
  }
}



const LOCALSTORAGE_LOGGEDUSER = 'BloglistLoggedUser'



export const doAuthenticate = (blogsService) => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem(LOCALSTORAGE_LOGGEDUSER)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsService.setToken(user.token)
      dispatch({
        type: 'SAVE',
        data: user
      })
    }
  }
}

export const doLogin = (blogsService, loginService, userData) => {
  return async dispatch => {
    const user = await loginService.login(userData)
    window.localStorage.setItem(LOCALSTORAGE_LOGGEDUSER, JSON.stringify(user))
    blogsService.setToken(user.token)
    dispatch({
      type: 'SAVE',
      data: user
    })
  }
}

export const doLogout = (blogsService) => {
  return async dispatch => {
    window.localStorage.removeItem(LOCALSTORAGE_LOGGEDUSER)
    blogsService.setToken(null)
    dispatch({
      type: 'CLEAR'
    })
  }
}



export default userReducer