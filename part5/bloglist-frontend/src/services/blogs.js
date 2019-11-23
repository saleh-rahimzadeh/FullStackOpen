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

const create = async (newBlog) => {
  const httpConfig = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, httpConfig)
  return response.data
}

const update = async (id, editedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, editedBlog)
  return response.data
}



export default {
  setToken,
  create,
  getAll,
  update
}