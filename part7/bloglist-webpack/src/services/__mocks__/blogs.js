const blogs = [
  {
    id:     'b1',
    title:  'Title1',
    author: 'Author1',
    url:    'www.title1.com',
    likes:  1,
    user: {
      _id:      'u1',
      username: 'user1',
      name:     'User Test 1'
    }
  },
  {
    id:     'b2',
    title:  'Title2',
    author: 'Author2',
    url:    'www.title2.com',
    likes:  2,
    user: {
      _id:      'u1',
      username: 'user1',
      name:     'User Test 1'
    }
  }
]



const setToken = () => {
}


const getAll = () => {
  return Promise.resolve(blogs)
}



export default {
  setToken,
  getAll
}