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



beforeEach(async () => {
  await Blog.deleteMany({})

  const blogsPromises = initialBlogs
    .map(blog => new Blog(blog))
    .map(blog => blog.save())
  await Promise.all(blogsPromises)
})



describe('Testing blogs API', () => {

  test('blogs are returned as json', async () => {
    await api
      .get(uri.API_BLOGS_URI)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 50000)


  test('all blogs are returned', async () => {
    const response = await api.get(uri.API_BLOGS_URI)
    expect(response.body.length).toBe(initialBlogs.length)
  })


  test('there is ID property', async () => {
    const listBlogs = await Blog.find({})
    const blog = listBlogs.map(blog => blog.toJSON())[0]
    expect(blog.id).toBeDefined()
  })

})



describe('addding new blogs', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Code Complete',
      author: 'Steve McConnell',
      url: 'http://www.stevemcconnell.com/',
      likes: 25
    }

    await api
      .post(uri.API_BLOGS_URI)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const listBlogs = await Blog.find({})
    expect(listBlogs.length).toBe(initialBlogs.length + 1)

    const contents = listBlogs.map(blog => blog.title)
    expect(contents).toContain('Code Complete')
  })


  test('blog without likes property is set to 0', async () => {
    const newBlog = {
      title: 'My dotJS 2017 Keynote',
      author: 'Brendan Eich',
      url: 'https://brendaneich.com/2017/12/my-dotjs-2017-keynote/'
    }

    await api
      .post(uri.API_BLOGS_URI)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const listBlogs = await Blog.find({})
    const blog = listBlogs.find(blog => blog.title === 'My dotJS 2017 Keynote')
    expect(blog.likes).toBe(0)
  })


  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Unknown Artist',
      likes: 1
    }

    await api
      .post(uri.API_BLOGS_URI)
      .send(newBlog)
      .expect(400)

    const listBlogs = await Blog.find({})
    expect(listBlogs.length).toBe(initialBlogs.length)
  })

})



describe('deletion of blogs', () => {

  test('delete a blog by valid id', async () => {
    const listBlogs = await Blog.find({})
    const blog = listBlogs[0].toJSON()

    await api
      .delete(`${uri.API_BLOGS_URI}/${blog.id}`)
      .expect(204)

    const changedBlogs = await Blog.find({})
    expect(changedBlogs.length).toBe(initialBlogs.length - 1)

    const contents = changedBlogs.map(blog => blog.title)
    expect(contents).not.toContain(blog.content)
  })

  test('reject deletion a blog by non-exist id', async () => {
    await api
      .delete(`${uri.API_BLOGS_URI}/5dc53c710cb2491364dbb100`)
      .expect(404)

    const changedBlogs = await Blog.find({})
    expect(changedBlogs.length).toBe(initialBlogs.length)
  })

  test('reject deletion a blog by invalid id', async () => {
    await api
      .delete(`${uri.API_BLOGS_URI}/0`)
      .expect(400)

    const changedBlogs = await Blog.find({})
    expect(changedBlogs.length).toBe(initialBlogs.length)
  })

})



describe('updating of blogs', () => {

  test('update a blog by valid id', async () => {
    const listBlogs = await Blog.find({})
    const blog = listBlogs[0].toJSON()

    const changedBlog = {
      title: 'Test Update',
      author: 'Mr. Test',
      url: 'http://www.test.com/',
      likes: 4
    }

    await api
      .put(`${uri.API_BLOGS_URI}/${blog.id}`)
      .send(changedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await Blog.find({})
    const contents = updatedBlogs.map(blog => blog.title)
    expect(contents).toContain('Test Update')
  })

  test('reject updating a blog by non-exist id', async () => {
    const changedBlog = {
      title: 'Test Update Invalid',
      author: 'Mr. Test',
      url: 'http://www.test.com/',
      likes: 4
    }

    await api
      .put(`${uri.API_BLOGS_URI}/5dc53c710cb2491364dbb100`)
      .send(changedBlog)
      .expect(404)

    const updatedBlogs = await Blog.find({})
    const contents = updatedBlogs.map(blog => blog.title)
    expect(contents).not.toContain('Test Update Invalid')
  })

  test('reject updating a blog by invalid id', async () => {
    const changedBlog = {
      title: 'Test Update Invalid',
      author: 'Mr. Test',
      url: 'http://www.test.com/',
      likes: 4
    }

    await api
      .put(`${uri.API_BLOGS_URI}/0`)
      .send(changedBlog)
      .expect(400)

    const updatedBlogs = await Blog.find({})
    const contents = updatedBlogs.map(blog => blog.title)
    expect(contents).not.toContain('Test Update Invalid')
  })

  test('reject updating a blog because of lack of likes', async () => {
    const listBlogs = await Blog.find({})
    const blog = listBlogs[0].toJSON()

    const changedBlog = {
      title: 'Test Update Without Likes',
      author: 'Mr. Test',
      url: 'http://www.test.com/'
    }

    await api
      .put(`${uri.API_BLOGS_URI}/${blog.id}`)
      .send(changedBlog)
      .expect(400)

    const updatedBlogs = await Blog.find({})
    const contents = updatedBlogs.map(blog => blog.title)
    expect(contents).not.toContain('Test Update Without Likes')
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