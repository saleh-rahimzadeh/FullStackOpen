import React from 'react'


const BlogItem = ({ blog, user, likesEventHandler, removeEventHandler, newCommentEventHandler, newCommentChangeEventHandler, newComment }) => {
	if (blog === undefined) {
		return null
	}

	const handleNewComment = (event) => {
		event.preventDefault(); 
		newCommentEventHandler(blog.id)
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
	        <div>
	        	<form onSubmit={handleNewComment}>
		          <input value={newComment} onChange={newCommentChangeEventHandler} /><button type="submit">add comment</button>
			    </form>
	        </div>
	        <ul>
	        {
	        	blog.comments.map(item => <li key={item.id}>{item.text}</li>)
	        }
	        </ul>
		</>
	)
}


export default BlogItem