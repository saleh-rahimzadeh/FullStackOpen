import React, { useState, useEffect } from 'react';
import axios                          from 'axios'
import PersonForm                     from './components/PersonForm'
import Filter                         from './components/Filter'
import Persons                        from './components/Persons'



const App = () => {

	/* Util Functions */
	const createNewObject = (newName, newNumber) => {
		return {
			name: newName,
			number: newNumber
		}
	}


	/* Defining States */
	const [ persons, setPersons ]     = useState([]) 
	const [ newName,   setNewName ]   = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ search,    setSearch ]    = useState('')


	/* Using Effect */
	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}, [])


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

		axios
			.post('http://localhost:3001/persons', createNewObject(newName, newNumber))
			.then(response => {
				setPersons(persons.concat(response.data))
				setNewName('')
				setNewNumber('')
				setSearch('')
			})
	}

	const search_onChange = (event) => {
		setSearch(event.target.value)
	}
  

	/* Rendering Components */
	console.log('Rendering Application...')

	return (
		<>
			<h2>Phonebook</h2>
			<Filter search={search} searchEventHandler={search_onChange} />

			<h3>Add a new</h3>
			<PersonForm newName={newName} newNumber={newNumber} addNameEventHandler={addName_onSubmit} newNameEventHandler={newName_onChange} newNumberEventHandler={newNumber_onChange} />

			<h3>Numbers</h3>
			<Persons persons={persons} search={search} />
		</>
	)

}



export default App