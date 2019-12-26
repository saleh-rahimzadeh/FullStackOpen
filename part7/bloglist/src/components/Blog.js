import React from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {

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

  return (
    <div style={blogStyle}>
      <div style={titleStyle}>
        <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>        
      </div>
    </div>
  )
}


export default Blog