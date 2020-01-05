import React, { useState } from 'react'


const UpdateAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(Number(0))

  if (!props.show) {
    return null
  }

  if (props.result.loading) {
    return <div>loading...</div>
  }

  const authors = props.result.data.allAuthors

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: {
        name,
        born
      }
    })

    setName('')
    setBorn(Number(0))
  }

  const authorChange = async ({ target }) => {
    setName(target.value)
  }


  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={authorChange}>
            {
              authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)
            }
          </select>
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor