import React           from 'react'
import { useEffect }   from 'react'
import { connect }     from 'react-redux'
import Blog            from './components/Blog'
import NewBlog         from './components/NewBlog'
import Notification    from './components/Notification'
import Togglable       from './components/Togglable'
import Users           from './components/Users'
import BlogItem        from './components/BlogItem'
import blogsService    from './services/blogs'
import loginService    from './services/login'
import usersService    from './services/users'
import commentsService from './services/comments'
import { useField }    from './hooks'
import { doInitialize, doCreate, doUpdate, doErase,doNewComment } from './reducers/blogsReducer'
import { doNoticeSuccess, doNoticeError }       from './reducers/notificationReducer'
import { doAuthenticate, doLogin, doLogout }    from './reducers/userReducer'
import { doLoadUsers }                          from './reducers/usersReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Table, Form, Button, Menu } from 'semantic-ui-react'



const App = ({ blogs, user, doInitialize, doCreate, doUpdate, doErase, doNoticeSuccess, doNoticeError, doAuthenticate, doLogin, doLogout, doLoadUsers, doNewComment }) => {

  /* Custom Hooks */
  const username   = useField('text')
  const password   = useField('password')
  const newTitle   = useField('text')
  const newAuthor  = useField('text')
  const newUrl     = useField('text')
  const newComment = useField('text')
  
  /* Component References */
  const newBlogFormRef = React.createRef()


  /* Using Effect */
  useEffect(() => {
    doInitialize(blogsService)
  }, [doInitialize])

  useEffect(() => {
    doLoadUsers(usersService)
  }, [doLoadUsers])

  useEffect(() => {
    doAuthenticate(blogsService)
  }, [doAuthenticate])


  /* Event Handlers */
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      doLogin(blogsService, loginService, {
        username: username.value,
        password: password.value
      })

      username.reset()
      password.reset()
    } catch (exception) {
      doNoticeError('Error: Can not log in')
      console.log(exception.response)
    }
  }

  const handleLogout = () => {
    doLogout(blogsService)
  }

  const addBlog_onSubmit = async (event) => {
    event.preventDefault()

    try {
      const blogData = {
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value
      }
      doCreate(blogsService, blogData)
      doLoadUsers(usersService)

      newBlogFormRef.current.toggleVisibility()
      console.log('Blog created', blogData)
      doNoticeSuccess(`A new blog ${blogData.title} by ${blogData.author} added`)

      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    } catch (exception) {
      doNoticeError('Error: Can not add new blog.')
      console.log(exception.response)
    }
  }

  const handleLikes = async (blog) => {
    try {
      const blogData = { 
        ...blog, 
        likes: (blog.likes + 1),
        user: blog.user.id
      }      
      doUpdate(blogsService, blog.id, blogData, blog.user)

      console.log('Blog liked', blogData)
      doNoticeSuccess(`The blog ${blogData.title} has liked to ${blogData.likes}.`)
    } catch (exception) {
      doNoticeError('Error: Can not like a blog.')
      console.log(exception.response)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        doErase(blogsService, blog.id)

        console.log('Blog removed', blog)
        doNoticeSuccess(`The blog ${blog.title} has removed.`)
      } catch (exception) {
        doNoticeError('Error: Can not remove a blog.')
        console.log(exception.response)
      }
    }
  }

  const handleNewComment = async (bid) => {
    try {
      const commentData = {
        text: newComment.value
      }
      doNewComment(commentsService, bid, commentData)

      console.log('Comment created', commentData)
      doNoticeSuccess(`A new comment added`)

      newComment.reset()
    } catch (exception) {
      doNoticeError('Error: Can not add new blog.')
      console.log(exception.response)
    }
  }


  const usernameProps = Object.assign({}, username)
  delete usernameProps.reset
  const passwordProps = Object.assign({}, password)
  delete passwordProps.reset


  /* Rendering Components */
  if (user === null) {
    return (
      <Container>
        <h1 className="app-name">blog app</h1> 
        <h2>Log in to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Field>
          <label>username</label>
            <input name="Username" {...usernameProps} />
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input name="Password" {...passwordProps} />
          </Form.Field>
          <Button type="submit" color='blue'>login</Button>
        </Form>
      </Container>
    )
  }

  return (
    <Router>
      <Container>
        <h1 className="app-name">blog app</h1>      

        <Menu inverted>
          <Menu.Item link>
          <Link to="/">blogs</Link>
          </Menu.Item>
          <Menu.Item link>
            <Link to="/users">users</Link>
          </Menu.Item>
          <Menu.Item>
            <span>{user.name} logged in <Button onClick={handleLogout} color='brown'>Logout</Button></span>
          </Menu.Item>
        </Menu>

        <Notification />

        <Route exact path="/" render={() => 
          <>
            <Togglable buttonLabel="New Blog" ref={newBlogFormRef}>
              <NewBlog
                title={newTitle.value}
                author={newAuthor.value}
                url={newUrl.value}
                newTitleEventHandler={newTitle.onChange}
                newAuthorEventHandler={newAuthor.onChange}
                newUrlEventHandler={newUrl.onChange}
                newBlogEventHandler={addBlog_onSubmit} />
            </Togglable>


            <Table striped celled>
              <Table.Body>
                {blogs.map(blog =>
                  <Blog key={blog.id} blog={blog} />
                )}
              </Table.Body>
            </Table>


          </>
        } />

        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/blogs/:id" render={({ match }) => 
          <BlogItem blog={blogs.find(item => item.id === match.params.id)} user={user.username} likesEventHandler={handleLikes} removeEventHandler={handleRemove} newCommentEventHandler={handleNewComment} newCommentChangeEventHandler={newComment.onChange} newComment={newComment.value} />
        } />
      </Container>
    </Router>
  )

}


export default connect(
  (state) => {
    return {
      blogs: state.blogs.sort((first, second) => second.likes - first.likes),
      user:  state.user
    }
  }, 
  {
    doInitialize,
    doCreate,
    doUpdate,
    doErase,
    doNoticeSuccess, 
    doNoticeError,
    doAuthenticate, 
    doLogin, 
    doLogout,
    doLoadUsers,
    doNewComment
  }
)(App)