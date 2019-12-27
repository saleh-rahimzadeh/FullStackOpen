import React from 'react'


const BlogItem = ({ blog, user, likesEventHandler, removeEventHandler, history }) => {
	if (blog === undefined) {
		history.push('/')
		return null
	}

	return (
		<>
			<h2>{blog.title}</h2>			
			<div>
	          <a href={blog.url}>{blog.url}</a>
	        </div>
	        <div>
	          {blog.likes} likes <button onClick={() => likesEventHandler(blog)}>like</button>
	        </div>
	        <div>
	          added by {blog.user.name}
	        </div>
	        <div>
	          {
	            blog.user.username === user ? <button onClick={() => { removeEventHandler(blog) }}>Remove</button> : null
	          }
	        </div>
	        <h3>Comments</h3>
	        <ul>
	        {
	        	blog.comments.map(comment => <li key={comment.id}>{comment.text}</li>)
	        }
	        </ul>
		</>
	)
}


export default BlogItem