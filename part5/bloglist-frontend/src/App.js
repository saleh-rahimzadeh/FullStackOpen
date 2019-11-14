import React, { useState, useEffect } from 'react'
import Blog                           from './components/Blog'
import blogsService                   from './services/blogs'
import loginService                   from './services/login'



const App = () => {
  
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
  
  
  /* Event Hand lers */
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Error', exception)
    }
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
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
}



export default App