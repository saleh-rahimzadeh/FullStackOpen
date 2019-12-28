const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE':
    return action.data
  case 'CREATE':
    return [...state, action.data]
  case 'UPDATE':
    return state.map(item => item.id !== action.data.id ? item : action.data.updatedBlog)
  case 'ERASE':
    return state.filter(item => item.id !== action.data)
  case 'NEW_COMMENT':
    return state.map(item => item.id !== action.data.bid ? item : appendComment(item, action.data.comment))
  default:
    return state
  }
}


const appendComment = (blog, comment) => {
  const clonedBlog = Object.assign({}, blog)
  clonedBlog.comments = clonedBlog.comments.concat({ text: comment.text, id: comment.id })
  return clonedBlog
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

export const doNewComment = (commentsService, bid, commentData) => {
  return async dispatch => {
    const newComment = await commentsService.create(bid, commentData)
    dispatch({
      type: 'NEW_COMMENT',
      data: {
        comment: newComment,
        bid
      }
    })
  }
}



export default blogsReducer