import React                 from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM }         from '@testing-library/dom'
import SimpleBlog            from './SimpleBlog'



describe('<SimpleBlog />', () => {

  let component
  const likesMockHandler = jest.fn()

  beforeEach(() => {
    const blogData = {
      title:  'Title1',
      author: 'Author1',
      likes:  1
    }

    component = render(
      <SimpleBlog blog={blogData} onClick={likesMockHandler} />
    )
  })


  test('renders its children', () => {
    const blog = component.container.querySelector('.blog')
    expect(blog).toBeDefined()
    console.log(prettyDOM(blog))
  })

  test('renders content', () => {
    expect(component.container.querySelector('.blog-content')).toHaveTextContent(
      'Title1 Author1'
    )
  })

  test('renders likes', () => {
    expect(component.container).toHaveTextContent(
      'blog has 1 likes'
    )
  })

  test('twice clicking the button calls event handler twice', async () => {
    const button = component.getByText('like+')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(likesMockHandler.mock.calls.length).toBe(2)
  })

})
