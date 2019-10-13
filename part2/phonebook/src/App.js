import React, { useState }  from 'react';



const Person = ({ Name, Number }) => {
	return (
		<div>
			{Name} : {Number}
		</div>
	)
}



const App = () => {

	/* Util Functions */
	const createNewObject = (newName, newNumber) => {
		return {
			name: newName,
			number: newNumber
		}
	}


	/* Defining States */
	const [ persons, setPersons ]     = useState([
		createNewObject('Arto Hellas', '040-1234567'),
		createNewObject('Ada Lovelace', '39-44-5323523'),
		createNewObject('Dan Abramov', '12-43-234345'),
		createNewObject('Mary Poppendieck', '39-23-6423122')
	]) 
	const [ newName,   setNewName ]   = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ search,    setSearch ]    = useState('')


	/* Defining Event Handlers */
	const newName_onChange = (event) => {
		setNewName(event.target.value)
	}

	const newNumber_onChange = (event) => {
		setNewNumber(event.target.value)
	}

	const addName_onSubmit = (event) => {
		event.preventDefault()

		if (persons.map(person => person.name).includes(newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		setPersons(persons.concat(createNewObject(newName, newNumber)))
		setNewName('')
		setNewNumber('')
	}

	const search_onChange = (event) => {
		setSearch(event.target.value)
	}


	/* Data */
	const Persons = () => persons.filter(person => search === '' ? true : person.name.toUpperCase().includes(search.toUpperCase())).map(person => <Person key={person.name} Name={person.name} Number={person.number} />)
  

  /* Rendering Components */
  console.log('Rendering Application...')

  return (
    <>
      <h2>Phonebook</h2>
      <div>
				filter shown with <input value={search} onChange={search_onChange} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addName_onSubmit}>
        <div>
          Name: <input value={newName} onChange={newName_onChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={newNumber_onChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {Persons()}
    </>
  )

}



export default App