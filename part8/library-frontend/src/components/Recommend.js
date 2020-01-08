import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import BookItem from './BookItem'


const Recommend = (props) => {
  const { loading, error, data } = useQuery(props.query)
  if (loading) return <div>loading...</div>;
  if (error) return `Error! ${error.message}`;

  if (!props.show) {
    return null
  }

  let books = ''
  if (data.me) {
    books = props.result.data.allBooks.map(b => b.genres.includes(data.me.favoriteGenre) ? <BookItem key={b.title} title={b.title} author={b.author.name} published={b.published} /> : null)
  } else {
    books = <tr></tr>
  }


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{data.me.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend