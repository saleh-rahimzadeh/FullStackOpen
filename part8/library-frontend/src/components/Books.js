import React, { useState } from 'react'
import BookItem from './BookItem'


const Books = (props) => {
  const [genre, setGenre] = useState('')

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const books = props.result.data.allBooks

  const genres = []
  books.forEach(b => b.genres.forEach(g => genres.includes(g) || genres.push(g)))

  const displayButtons = () => {
    if (genre && genre !== '') {
      return books.map(b => b.genres.includes(genre) ? <BookItem key={b.title} title={b.title} author={b.author.name} published={b.published} /> : null)
    } else {
      return books.map(b => <BookItem key={b.title} title={b.title} author={b.author.name} published={b.published} />)
    }
  }

  const displayGenre = () => {
    return genre ? <p>in genre <strong>{genre}</strong></p> : null
  }


  return (
    <div>
      <h2>books</h2>
      {
        displayGenre()
      }
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {displayButtons()}
        </tbody>
      </table>
      <div>
        {
          genres.map(g => <button key={g} onClick={() => setGenre(g) }>{g}</button>)
        }
        <button key={'1'} onClick={() => setGenre('') }>all genres</button>
      </div>
    </div>
  )
}

export default Books