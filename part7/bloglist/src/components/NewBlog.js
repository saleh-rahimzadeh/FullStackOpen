import React     from 'react'
import PropTypes from 'prop-types'



const NewBlog = ({ title, author, url, newTitleEventHandler, newAuthorEventHandler, newUrlEventHandler, newBlogEventHandler }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newBlogEventHandler}>
        <div>
          Title: <input value={title} onChange={newTitleEventHandler} />
        </div>
        <div>
          Author: <input value={author} onChange={newAuthorEventHandler} />
        </div>
        <div>
          Url: <input value={url} onChange={newUrlEventHandler} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}


NewBlog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  newTitleEventHandler: PropTypes.func.isRequired,
  newAuthorEventHandler: PropTypes.func.isRequired,
  newUrlEventHandler: PropTypes.func.isRequired,
  newBlogEventHandler: PropTypes.func.isRequired
}



export default NewBlog