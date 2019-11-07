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
  {
    title: 'Thoughts on Rust in 2019',
    author: 'Steve Klabnik',
    url: 'https://words.steveklabnik.com/thoughts-on-rust-in-2019',
    likes: 5
  },
]


describe('Testing blogs API', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsPromises = initialBlogs
      .map(blog => new Blog(blog))
      .map(blog => blog.save())
    await Promise.all(blogsPromises)
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


  test('there is ID property', async () => {
    const listBlogs = await Blog.find({})
    const blog = listBlogs.map(blog => blog.toJSON())[0]
    expect(blog.id).toBeDefined()
  })


  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Code Complete',
      author: 'Steve McConnell',
      url: 'http://www.stevemcconnell.com/',
      likes: 25
    }

    await api
      .post(uri.API_URI)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const listBlogs = await Blog.find({})
    expect(listBlogs.length).toBe(initialBlogs.length + 1)

    const contents = listBlogs.map(blog => blog.title)
    expect(contents).toContain('Code Complete')
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