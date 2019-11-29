import React                      from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App                        from './App'



describe('<App />', () => {

  test('if no user logged, login form is displayed and blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    expect(component.container).toHaveTextContent(
      'Log in to application'
    )

    expect(component.container).not.toHaveTextContent(
      'blogs'
    )
  })

  test('if a user is logged, the blog posts are rendered to the page', async () => {
    const user = {
      username: 'user1',
      token: 't1',
      name: 'User Test 1'
    }
    localStorage.setItem('BloglistLoggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Logout')
    )

    expect(component.container).toHaveTextContent(
      'blogs'
    )

    const blogs = component.container.querySelectorAll('.blog-content')
    expect(blogs.length).toBe(2)
  })

})