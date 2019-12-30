describe('App ', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'User Test One',
      username: 'user1',
      password: 'u11'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blog app')
  })


  describe('when logged in', function() {

    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('u11')
      cy.contains('login').click()
    })

    it('name of the user is shown', function() {
      cy.contains('User Test One logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#new-title').type('a blog created by cypress')
      cy.get('#new-author').type('saleh')
      cy.get('#new-url').type('https://saleh-rahimzadeh.github.io')
      cy.contains('Create').click()
      cy.contains('a blog created by cypress')
    })

  })

  describe('when blog created', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('u11')
      cy.contains('login').click()
      cy.contains('New Blog').click()
      cy.get('#new-title').type('a blog created by cypress')
      cy.get('#new-author').type('saleh')
      cy.get('#new-url').type('https://saleh-rahimzadeh.github.io')
      cy.contains('Create').click()
      cy.wait(6000)
    })

    it('The blog can be liked', function() {
      cy.contains('a blog created by cypress').click()
      cy.contains('like').click()
      cy.contains('1 likes')
    })

    it('The blog can be removed', function() {
      cy.contains('a blog created by cypress').click()
      cy.contains('Remove').click()
    })

  })


  describe('users visiting', function() {

    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('u11')
      cy.contains('login').click()
      cy.contains('New Blog').click()
      cy.get('#new-title').type('a blog created by cypress')
      cy.get('#new-author').type('saleh')
      cy.get('#new-url').type('https://saleh-rahimzadeh.github.io')
      cy.contains('Create').click()
    })

    it('users page can be opened', function() {
      cy.contains('users').click()
      cy.contains('User Test One')
    })

    it('blogs of user can visited', function() {
      cy.contains('users').click()
      cy.get('a:last').click()
      cy.contains('added blogs').click()
    })

  })

})
