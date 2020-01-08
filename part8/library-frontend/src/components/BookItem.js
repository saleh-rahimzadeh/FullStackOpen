import React from 'react'

const BookItem = ({ title, author, published }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td>{published}</td>
    </tr>
  )
}

export default BookItem