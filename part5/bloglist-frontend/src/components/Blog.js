import React, { useState } from 'react'



const Blog = ({ blog, user, likesEventHandler, removeEventHandler }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5
  }

  const titleStyle = {
    cursor: 'pointer',
    fontSize: 18
  }

  const visibilityStyle = {
    display: visible ? '' : 'none'
  }


  return (
    <div style={blogStyle}>

      <div onClick={toggleVisibility} style={titleStyle}>
        {blog.title} - {blog.author}
      </div>

      <div style={visibilityStyle}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} likes <button onClick={likesEventHandler}>like</button>
        </div>
        <div>
          added by {blog.user.name}
        </div>
        <div>
          {
            blog.user.username === user ? <button onClick={removeEventHandler}>Remove</button> : null
          }
        </div>
      </div>

    </div>
  )
}



export default Blog