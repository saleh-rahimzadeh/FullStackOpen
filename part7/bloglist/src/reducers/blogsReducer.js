const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return action.data
        case 'CREATE':
            return [...state, action.data]
        case 'UPDATE':
            const id = action.data.id
            return state.map(item => item.id !== id ? item : action.data.updatedBlog)
        case 'ERASE':
            return state.filter(item => item.id !== action.data)
        default:
            return state
    }
}


export const doInitialize = (blogsService) => {
    return async dispatch => {
        const items = await blogsService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: items
        })
    }
}

export const doCreate = (blogsService, blogData) => {
    return async dispatch => {
        const newBlog = await blogsService.create(blogData)
        dispatch({
            type: 'CREATE',
            data: newBlog
        })
    }
}

export const doUpdate = (blogsService, id, blogData, blogUser) => {
    return async dispatch => {
        let updatedBlog = await blogsService.update(id, blogData)
        updatedBlog = { ...updatedBlog, user: blogUser }
        dispatch({
            type: 'UPDATE',
            data: {
                id,
                updatedBlog
            }
        })
    }
}

export const doErase = (blogsService, id) => {
    return async dispatch => {
        await blogsService.erase(id)
        dispatch({
            type: 'ERASE',
            data: id
        })
    }
}



export default blogsReducer