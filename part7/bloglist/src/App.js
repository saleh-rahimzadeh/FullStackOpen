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
import { doNoticeSuccess, doNoticeError, doNoticeClear } from './reducers/notificationReducer'



const App = (props) => {

  /* Consts */
  const LOCALSTORAGE_LOGGEDUSER = 'BloglistLoggedUser'

  /* Custom Hooks */
  const username  = useField('text')
  const password  = useField('password')
  const newTitle  = useField('text')
  const newAuthor = useField('text')
  const newUrl    = useField('text')

  /* Defining States */
  const [ user, setUser ]                 = useState(null)
  const [ blogs, setBlogs ]               = useState([])
  
  /* Component References */
  const newBlogFormRef = React.createRef()


  /* Util Functions */
  const saveBlogsAsSorted = (blogs) => {
    setBlogs(blogs.sort((first, second) => second.likes - first.likes))
  }


  /* Using Effect */
  useEffect(() => {
    blogsService
      .getAll()
      .then(blogsData => {
        saveBlogsAsSorted(blogsData)
      })
  }, [])

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
      props.doNoticeError('Error: Can not log in')
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
      const blogData = await blogsService.create({
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value
      })
      newBlogFormRef.current.toggleVisibility()
      saveBlogsAsSorted(blogs.concat(blogData))

      console.log('Blog created', blogData)
      props.doNoticeSuccess(`A new blog ${blogData.title} by ${blogData.author} added`)

      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    } catch (exception) {
      props.doNoticeError('Error: Can not add new blog.')
      console.log(exception.response)
    }
  }

  const handleLikes = async (blog) => {
    try {
      const blogData = await blogsService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: (blog.likes + 1),
        user: blog.user.id
      })

      saveBlogsAsSorted(blogs.map(blogItem => {
        if (blogItem.id !== blogData.id) {
          return blogItem
        } else {
          blogItem.likes = blogData.likes
          return blogItem
        }
      }))

      console.log('Blog liked', blogData)
      props.doNoticeSuccess(`The blog ${blogData.title} has liked to ${blogData.likes}.`)
    } catch (exception) {
      props.doNoticeError('Error: Can not like a blog.')
      console.log(exception.response)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogsService.erase(blog.id)

        saveBlogsAsSorted(blogs.filter(blogItem => blogItem.id !== blog.id))

        console.log('Blog removed', blog.id)
        props.doNoticeSuccess(`The blog ${blog.title} has removed.`)
      } catch (exception) {
        props.doNoticeError('Error: Can not remove a blog.')
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
  null, 
  {
    doNoticeSuccess, 
    doNoticeError, 
    doNoticeClear
  }
)(App)