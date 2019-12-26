import React from 'react'
import { connect } from 'react-redux'


const Users = (props) => {
	if (props.users === undefined || props.users.length === 0) {
		return null
	}

	return (
		<>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th>user</th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{props.users.map(item => <tr key={item.id}><td>{item.name}</td><td>{item.blogs.length}</td></tr>)}
				</tbody>
			</table>
		</>
	)
}


export default connect(
  (state) => {
    return {
      users: state.users
    }
  }, 
  null
)(Users)