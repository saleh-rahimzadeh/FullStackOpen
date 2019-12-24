import React                   from 'react'
import { useState, useEffect } from 'react'
import { connect }             from 'react-redux'
import Blog                    from './components/Blog'
import NewBlog                 from './components/NewBlog'
import Notification            from './components/Notification'
import Togglable               from './components/Togglable'
import blogsService            from './services/blogs'
import loginService            from './services/login'
import { useField }            from './hooks'
import { doInitialize, doCreate, doUpdate, doErase } from './reducers/blogsReducer'
import { doNoticeSuccess, doNoticeError } from './reducers/notificationReducer'



const App = ({ blogs, doInitialize, doCreate, doUpdate, doErase, doNoticeSuccess, doNoticeError }) => {

  /* Consts */
  const LOCALSTORAGE_LOGGEDUSER = 'BloglistLoggedUser'

  /* Custom Hooks */
  const username  = useField('text')
  const password  = useField('password')
  const newTitle  = useField('text')
  const newAuthor = useField('text')
  const newUrl    = useField('text')

  /* Defining States */
  const [ user, setUser ] = useState(null)
  
  /* Component References */
  const newBlogFormRef = React.createRef()


  /* Using Effect */
  useEffect(() => {
    doInitialize(blogsService)
  }, [doInitialize])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOCALSTORAGE_LOGGEDUSER)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])


  /* Event Handlers */
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(LOCALSTORAGE_LOGGEDUSER, JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)

      username.reset()
      password.reset()
    } catch (exception) {
      doNoticeError('Error: Can not log in')
      console.log(exception.response)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(LOCALSTORAGE_LOGGEDUSER)
    blogsService.setToken(null)
    setUser(null)
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


  const usernameProps = Object.assign({}, username)
  delete usernameProps.reset
  const passwordProps = Object.assign({}, password)
  delete passwordProps.reset


  /* Rendering Components */
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input name="Username" {...usernameProps} />
          </div>
          <div>
            password
            <input name="Password" {...passwordProps} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>

      <Notification />

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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user.username} likesEventHandler={() => handleLikes(blog)} removeEventHandler={() => handleRemove(blog)} />
      )}
    </div>
  )

}



export default connect(
  (state) => {
    return {
      blogs: state.blogs.sort((first, second) => second.likes - first.likes)
    }
  }, 
  {
    doInitialize,
    doCreate,
    doUpdate,
    doErase,
    doNoticeSuccess, 
    doNoticeError
  }
)(App)