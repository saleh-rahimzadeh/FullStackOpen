describe('App ', function() {

  beforeEach(function() {
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


  describe('users visiting', function() {

    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('user1')
      cy.get('#password').type('u11')
      cy.contains('login').click()      
    })

    it('users page can be opened and row of the user is shown', function() {
      cy.contains('users').click()
      cy.contains('User Test One')
    })

  })

})
