import React, { useState, useEffect } from 'react'
import Blog                           from './components/Blog'
import NewBlog                        from './components/NewBlog'
import Notification                   from './components/Notification'
import Togglable                      from './components/Togglable'
import blogsService                   from './services/blogs'
import loginService                   from './services/login'



const App = () => {

  /* Consts */
  const LOCALSTORAGE_LOGGEDUSER = 'BloglistLoggedUser'

  /* Defining States */
  const [ username, setUsername ]         = useState('')
  const [ password, setPassword ]         = useState('')
  const [ user, setUser ]                 = useState(null)
  const [ blogs, setBlogs ]               = useState([])
  const [ newTitle,   setNewTitle ]       = useState('')
  const [ newAuthor, setNewAuthor ]       = useState('')
  const [ newUrl, setNewUrl ]             = useState('')
  const [ notification, setNotification ] = useState(null)

  /* Component References */
  const newBlogFormRef = React.createRef()


  /* Util Functions */
  const arrangeNotification = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => { setNotification(null) }, 5000)
  }

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
        username,
        password
      })

      window.localStorage.setItem(LOCALSTORAGE_LOGGEDUSER, JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      arrangeNotification('Error: Can not log in', true)
      console.log(exception.response)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(LOCALSTORAGE_LOGGEDUSER)
    blogsService.setToken(null)
    setUser(null)
  }

  const newTitle_onChange = (event) => {
    setNewTitle(event.target.value)
  }

  const newAuthor_onChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const newUrl_onChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog_onSubmit = async (event) => {
    event.preventDefault()

    try {
      const blogData = await blogsService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      newBlogFormRef.current.toggleVisibility()
      saveBlogsAsSorted(blogs.concat(blogData))

      console.log('Blog created', blogData)
      arrangeNotification(`A new blog ${blogData.title} by ${blogData.author} added`)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      arrangeNotification('Error: Can not add new blog.', true)
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
      arrangeNotification(`The blog ${blogData.title} has liked to ${blogData.likes}.`)
    } catch (exception) {
      arrangeNotification('Error: Can not like a blog.', true)
      console.log(exception.response)
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogsService.erase(blog.id)

        saveBlogsAsSorted(blogs.filter(blogItem => blogItem.id !== blog.id))

        console.log('Blog removed', blog.id)
        arrangeNotification(`The blog ${blog.title} has removed.`)
      } catch (exception) {
        arrangeNotification('Error: Can not remove a blog.', true)
        console.log(exception.response)
      }
    }
  }


  /* Rendering Components */
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification notice={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
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

      <Notification notice={notification} />

      <Togglable buttonLabel="New Blog" ref={newBlogFormRef}>
        <NewBlog
          title={newTitle}
          author={newAuthor}
          url={newUrl}
          newTitleEventHandler={newTitle_onChange}
          newAuthorEventHandler={newAuthor_onChange}
          newUrlEventHandler={newUrl_onChange}
          newBlogEventHandler={addBlog_onSubmit} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user.username} likesEventHandler={() => handleLikes(blog)} removeEventHandler={() => handleRemove(blog)} />
      )}
    </div>
  )

}



export default App