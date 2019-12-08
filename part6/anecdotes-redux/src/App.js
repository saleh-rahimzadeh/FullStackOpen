import React            from 'react'
import { useEffect }    from 'react'
import { connect }      from 'react-redux'
import AnecdoteForm     from './components/AnecdoteForm'
import AnecdoteList     from './components/AnecdoteList'
import Notification     from './components/Notification'
import Filter           from './components/Filter'
import anecdotesService from './services/anecdotes'
import { doInitialize } from './reducers/anecdoteReducer'


const App = (props) => {
  useEffect(() => {
    anecdotesService.getAll().then(data => { 
      props.doInitialize(data) 
    })
  }, [props])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter       />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}


export default connect(
  null, 
  { 
    doInitialize 
  }
)(App)