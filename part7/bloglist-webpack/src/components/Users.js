import React       from 'react'
import { connect } from 'react-redux'
import UserItem    from '../components/UserItem'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


const Users = (props) => {
  if (props.users === undefined || props.users.length === 0) {
    return null
  }

  return (
    <Router>
      <Route exact path="/users" render={() =>
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
              {props.users.map(item => <tr key={item.id}><td><Link to={`/users/${item.id}`}>{item.name}</Link></td><td>{item.blogs.length}</td></tr>)}
            </tbody>
          </table>
        </>
      } />
      <Route exact path="/users/:id" render={({ match }) =>
        <UserItem user={props.users.find(item => item.id === match.params.id)} />
      } />
    </Router>
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