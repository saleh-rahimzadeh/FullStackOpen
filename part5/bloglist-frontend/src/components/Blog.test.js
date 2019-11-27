import React                 from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM }         from '@testing-library/dom'
import Blog                  from './Blog'


describe('<Blog />', () => {

    let component

    beforeEach(() => {
        const blogData = {
            title:  "Title1",
            author: "Author1",
            url:    "www.blog1.com",
            likes:  1,
            user: {
                name:     "User1",
                username: "user1"
            }
        }

        const likesMockHandler  = jest.fn()
        const removeMockHandler = jest.fn()

        component = render(
            <Blog blog={blogData} user={"user1"} likesEventHandler={likesMockHandler} removeEventHandler={removeMockHandler} />
        )
    })


    test('the name and author of the blog post are renderd', () => {
        expect(component.container).toHaveTextContent(
            'Title1 - Author1'
        )
    })

    test('at start only the name and author of the blog post are shown by default', () => {
        const div = component.container.querySelector('.blog-content')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking blog post, the other information of the blog post becomes visible', () => {
        const button = component.getByText('Title1 - Author1')
        fireEvent.click(button)

        const div = component.container.querySelector('.blog-content')
        expect(div).not.toHaveStyle('display: none')
    })

})