import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import UpdateAuthor from './components/UpdateAuthor'



const QUERY_ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const QUERY_ALL_BOOKS = gql`
  {
    allBooks {
      title
      author
      published
    }
  }
`

const MUTATION_CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) 
  {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author
    }
  }
`

const MUTATION_EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!,
    $born: Int!
  )
  {
    editAuthor(
      name: $name,
      setBornTo: $born
    )
    {
      name
      born
    }
  }
`


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (error) => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const authors = useQuery(QUERY_ALL_AUTHORS)
  const books = useQuery(QUERY_ALL_BOOKS)

  const [addBook] = useMutation(MUTATION_CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: QUERY_ALL_BOOKS }, { query: QUERY_ALL_AUTHORS }]
  })
  const [editAuthor] = useMutation(MUTATION_EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: QUERY_ALL_AUTHORS }]
  })


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('editAuthor')}>edit author</button>
      </div>

      {
        errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }

      <Authors
        show={page === 'authors'} result={authors}
      />

      <Books
        show={page === 'books'} result={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <UpdateAuthor
        show={page === 'editAuthor'}
        editAuthor={editAuthor}
      />

    </div>
  )
}

export default App