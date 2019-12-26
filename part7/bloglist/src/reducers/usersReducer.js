const usersReducer = (state = [], action) => {
	switch (action.type) {
        case 'LOAD_USERS':
            return action.data
        default:
        	return state
    }
}



export const doLoadUsers = (usersService) => {
    return async dispatch => {
        const items = await usersService.getAllUsers()
        dispatch({
            type: 'LOAD_USERS',
            data: items
        })
    }
}



export default usersReducer