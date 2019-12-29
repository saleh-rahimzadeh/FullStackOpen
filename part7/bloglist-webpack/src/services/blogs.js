import axios from 'axios'



const baseUrl = '/api/blogs'
let token     = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
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

const erase = async (id) => {
  const httpConfig = {
    headers: { Authorization: token }
  }

  const response = axios.delete(`${baseUrl}/${id}`, httpConfig)
  return response
}



export default {
  setToken,
  create,
  getAll,
  update,
  erase
}