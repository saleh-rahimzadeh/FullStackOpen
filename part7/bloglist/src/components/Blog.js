import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'


const Blog = ({ blog }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> 
      </Table.Cell>
      <Table.Cell>
        {blog.author}
      </Table.Cell>
    </Table.Row>
  )
}


export default Blog