import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import BookItem from './BookItem'


const QUERY_BOOKS = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`


const Recommend = (props) => {
  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState(null)
  const { loading, error, data } = useQuery(props.query)
  const client = useApolloClient(QUERY_BOOKS)

  if (loading) return <div>loading...</div>;
  if (error) return `Error! ${error.message}`;
  
  if (!genre) {
    setGenre(data.me.favoriteGenre)
  }

  if (!props.show) {
    return null
  }

  const callinger = async () => {
    const bks = await client.query({
      query: QUERY_BOOKS,
      variables: { genre: genre }
    })
    setBooks(bks.data.allBooks)
  }
  callinger()

  let booksResult = ''
  if (books) {
    booksResult = books.map(b => b.genres.includes(genre) ? <BookItem key={b.title} title={b.title} author={b.author.name} published={b.published} /> : null)
  } else {
    booksResult = <tr><td>.</td></tr>
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
          {booksResult}
        </tbody>
      </table>
    </div>
  )

}

export default Recommend