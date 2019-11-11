const mongoose  = require('mongoose')
const supertest = require('supertest')
const app       = require('../app')
const uri       = require('../utils/uri.js')
const User      = require('../models/user')


const api = supertest(app)


beforeEach(async () => {
  await User.deleteMany({})

  const user = new User({ username: 'root', name: 'Root', passwordHash: 'sekret' })
  await user.save()
})



describe('Testing users API', () => {

  test('users are returned as json', async () => {
    await api
      .get(uri.API_USERS_URI)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 50000)


  test('all users are returned', async () => {
    const response = await api.get(uri.API_USERS_URI)
    const users = await User.find({})
    expect(response.body.length).toBe(users.length)
  })

})



describe('addding new users', () => {

  test('a valid user can be added', async () => {
    let users = await User.find({})
    const beginUsers = users.map(u => u.toJSON())

    const newUser = {
      username: 'myuser1',
      name: 'My User 1',
      password: 'u123'
    }

    await api
      .post(uri.API_USERS_URI)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    users = await User.find({})
    const finishUsers = users.map(u => u.toJSON())

    expect(finishUsers.length).toBe(beginUsers.length + 1)

    const usernames = finishUsers.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user without username is not added', async () => {
    let users = await User.find({})
    const beginUsers = users.map(u => u.toJSON())

    const newUser = {
      username: '',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post(uri.API_USERS_URI)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    users = await User.find({})
    const finishUsers = users.map(u => u.toJSON())

    expect(finishUsers.length).toBe(beginUsers.length)
  })

  test('user with username shorter than the minimum length (3) is not added', async () => {
    let users = await User.find({})
    const beginUsers = users.map(u => u.toJSON())

    const newUser = {
      username: 'u1',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post(uri.API_USERS_URI)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` (`u1`) is shorter than the minimum allowed length (3)')

    users = await User.find({})
    const finishUsers = users.map(u => u.toJSON())

    expect(finishUsers.length).toBe(beginUsers.length)
  })

  test('user with non-unique username is not added', async () => {
    let users = await User.find({})
    const beginUsers = users.map(u => u.toJSON())

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post(uri.API_USERS_URI)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    users = await User.find({})
    const finishUsers = users.map(u => u.toJSON())

    expect(finishUsers.length).toBe(beginUsers.length)
  })

  test('user without password is not added', async () => {
    let users = await User.find({})
    const beginUsers = users.map(u => u.toJSON())

    const newUser = {
      username: 'user1',
      name: 'Superuser',
      password: '',
    }

    const result = await api
      .post(uri.API_USERS_URI)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password missing')

    users = await User.find({})
    const finishUsers = users.map(u => u.toJSON())

    expect(finishUsers.length).toBe(beginUsers.length)
  })

  test('user with password shorter than the minimum length (3) is not added', async () => {
    let users = await User.find({})
    const beginUsers = users.map(u => u.toJSON())

    const newUser = {
      username: 'user1',
      name: 'Superuser',
      password: '11',
    }

    const result = await api
      .post(uri.API_USERS_URI)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password is shorter than the minimum allowed length (3)')

    users = await User.find({})
    const finishUsers = users.map(u => u.toJSON())

    expect(finishUsers.length).toBe(beginUsers.length)
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