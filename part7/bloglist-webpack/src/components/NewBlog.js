import React     from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'semantic-ui-react'



const NewBlog = ({ title, author, url, newTitleEventHandler, newAuthorEventHandler, newUrlEventHandler, newBlogEventHandler }) => {
  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={newBlogEventHandler}>
        <Form.Field>
          <label>Title:</label> <input value={title} onChange={newTitleEventHandler} />
        </Form.Field>
        <Form.Field>
          <label>Author:</label> <input value={author} onChange={newAuthorEventHandler} />
        </Form.Field>
        <Form.Field>
          <label>Url:</label> <input value={url} onChange={newUrlEventHandler} />
        </Form.Field>
        <Form.Field>
          <Button type="submit" color='green'>Create</Button>
        </Form.Field>
      </Form>
    </div>
  )
}


NewBlog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  newTitleEventHandler: PropTypes.func.isRequired,
  newAuthorEventHandler: PropTypes.func.isRequired,
  newUrlEventHandler: PropTypes.func.isRequired,
  newBlogEventHandler: PropTypes.func.isRequired
}



export default NewBlog