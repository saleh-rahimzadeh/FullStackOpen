import React from 'react'
import { connect } from 'react-redux'


const UserItem = ( { username, blogs } ) => {
	if (username === undefined) {
		return null
	}

	return (
		<>
			<h3>{username}</h3>
			<h4>added blogs</h4>
			<ul>
				{
					blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
				}
			</ul>
		</>
	)
}


export default connect(
  (state, ownProps) => {
    return {
      username: ownProps.user.name,
      blogs: ownProps.user.blogs
    }
  }, 
  null
)(UserItem)