import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import UpdateAuthor from './components/UpdateAuthor'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'


const BOOK_DETAILS = gql`
  fragment BookDetails on BOOK {
    title
    author {
      name
    }
    published
    genres
  }
`

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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}  
`

const QUERY_ME = gql`
 {
  me {
    favoriteGenre
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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

const MUTATION_LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const notify = (message) => {
    window.alert(message)
  }

  const handleError = (error) => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: QUERY_ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      dataInStore.allBooks.push(addedBook)
      client.writeQuery({
        query: QUERY_ALL_BOOKS,
        data: dataInStore
      })
    }   
  }

  const authors = useQuery(QUERY_ALL_AUTHORS)
  const books = useQuery(QUERY_ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })
  
  const [addBook] = useMutation(MUTATION_CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })
  const [editAuthor] = useMutation(MUTATION_EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [
      { query: QUERY_ALL_AUTHORS }
    ]
  })
  const [login] = useMutation(MUTATION_LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>


  if (!token) {
    return (
      <div>
        {errorNotification()}
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('editAuthor')}>edit author</button>
        <button onClick={() => setPage('recommend')}>Recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      {errorNotification()}

      <Authors
        show={page === 'authors'} 
        result={authors}
      />

      <Books
        show={page === 'books'} 
        result={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <UpdateAuthor
        show={page === 'editAuthor'}
        editAuthor={editAuthor}
        result={authors}
      />

      <Recommend 
        show={page === 'recommend'}
        query={QUERY_ME}
        result={books}
      />

    </div>
  )
}

export default App