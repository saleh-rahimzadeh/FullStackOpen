import axios from 'axios'



const baseUrl = '/api/blogs'
let token     = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const httpConfig = {
    headers: { Authorization: token }
  }

  const request = axios.post(baseUrl, newBlog, httpConfig)
  return request.then(response => response.data)
}



export default {
  setToken,
  create,
  getAll
}