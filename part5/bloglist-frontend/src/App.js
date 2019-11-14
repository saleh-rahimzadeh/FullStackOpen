import React, { useState, useEffect } from 'react'
import Blog                           from './components/Blog'
import blogsService                   from './services/blogs'
import loginService                   from './services/login'



const App = () => {

  /* Consts */
  const LOCALSTORAGE_LOGGEDUSER = 'BloglistLoggedUser'
  
  /* Defining States */
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('') 
  const [ user, setUser ]         = useState(null)
  const [ blogs, setBlogs ]       = useState([])
  
  
  /* Using Effect */
  useEffect(() => {
    blogsService
      .getAll()
      .then(blogsData => {
        setBlogs(blogsData)
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
  
  
  /* Event Hand lers */
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
      console.log('Error', exception)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem(LOCALSTORAGE_LOGGEDUSER)
    blogsService.setToken(null)
    setUser(null)
  }
  
    
  /* Rendering Components */
  console.log('Rendering Application...')

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
}



export default App