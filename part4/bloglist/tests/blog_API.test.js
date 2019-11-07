const mongoose  = require('mongoose')
const supertest = require('supertest')
const app       = require('../app')
const uri       = require('../utils/uri.js')
const Blog      = require('../models/blog')


const api = supertest(app)


const initialBlogs = [
  {
    title: 'Understanding ECMAScript 6',
    author: 'Nicholas C. Zakas',
    url: 'https://leanpub.com/understandinges6/read',
    likes: 20
  },
  {
    title: 'Exploring ES6',
    author: 'Axel Rauschmayer',
    url: 'http://exploringjs.com/es6.html',
    likes: 10
  },
]


describe('Testing blogs API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get(uri.API_URI)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 50000)


  test('all blogs are returned', async () => {
    const response = await api.get(uri.API_URI)
    expect(response.body.length).toBe(initialBlogs.length)
  })
})


beforeAll(async (done) => {
  await done()
})

afterAll(async (done) => {
  mongoose.connection.close()
  mongoose.disconnect()
  await done()
})