import React, { useState, useEffect } from 'react';
import PersonForm                     from './components/PersonForm'
import Filter                         from './components/Filter'
import Persons                        from './components/Persons'
import PersonsService                 from './services/Persons'



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
		PersonsService
			.getAll()
			.then(personsData => {
				setPersons(personsData)
			})
			.catch(error => {
				alert("Error: Can't get persons")
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

		PersonsService
			.create(createNewObject(newName, newNumber))
			.then(personData => {
				console.log('Person created', personData)
				setPersons(persons.concat(personData))
				setNewName('')
				setNewNumber('')
				setSearch('')
			})
			.catch(error => {
				alert("Error: Can't add a new person")
			})
	}

	const search_onChange = (event) => {
		setSearch(event.target.value)
	}

	const delete_onClick = (person) => {
		if (window.confirm(`Delete ${person.name} ?`)) { 
			PersonsService
			.erase(person.id)
			.then(status => {
				console.log('Person deleted', person)
				setPersons(persons.filter(personItem => personItem.id !== person.id))
			})
			.catch(error => {
				alert("Error: Can't delete person")
			})
		}
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
			<Persons persons={persons} search={search} deleteEventHandler={delete_onClick} />
		</>
	)

}



export default App