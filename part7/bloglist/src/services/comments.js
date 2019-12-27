import axios from 'axios'



const baseUrl = '/api/blogs'


const create = async (id, newComment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment)
  return response.data
}



export default {
  create
}