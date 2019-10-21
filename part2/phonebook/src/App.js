import React, { useState, useEffect } from 'react';
import PersonForm                     from './components/PersonForm'
import Filter                         from './components/Filter'
import Persons                        from './components/Persons'
import Notification                   from './components/Notification'
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
	const [ persons, setPersons ]           = useState([]) 
	const [ newName,   setNewName ]         = useState('')
	const [ newNumber, setNewNumber ]       = useState('')
	const [ search,    setSearch ]          = useState('')
	const [ notification, setNotification ] = useState(null)


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

		const thatPerson = persons.find(person => person.name === newName)

		if (thatPerson === undefined) {
			PersonsService
				.create(createNewObject(newName, newNumber))
				.then(personData => {
					console.log('Person created', personData)
					setPersons(persons.concat(personData))
					setNotification({ message: `Added ${personData.name}` })
					setTimeout(() => { setNotification(null) }, 3000)
					setNewName('')
					setNewNumber('')
					setSearch('')
				})
				.catch(error => {
					alert("Error: Can't add a new person")
				})
			return
		}

		if (thatPerson.number === newNumber) {
			alert(`${newName} is already added to phonebook`)
		} else {
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				const updatedPerson = { 
					...thatPerson, 
					number: newNumber
				}

				PersonsService
					.update(updatedPerson)
					.then(personData => {
						console.log('Person changed', personData)
						setPersons(persons.map(personItem => personItem.id !== personData.id ? personItem : personData))
						setNotification({ message: `Changed ${personData.name}` })
						setTimeout(() => { setNotification(null) }, 3000)
						setNewName('')
						setNewNumber('')
						setSearch('')
					})
					.catch(error => {
						alert("Error: Can't update the person")
					})
			}
		}
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
			<h1>Phonebook</h1>

			<Notification notice={notification} />

			<Filter search={search} searchEventHandler={search_onChange} />

			<h3>Add a new</h3>
			<PersonForm newName={newName} newNumber={newNumber} addNameEventHandler={addName_onSubmit} newNameEventHandler={newName_onChange} newNumberEventHandler={newNumber_onChange} />

			<h3>Numbers</h3>
			<Persons persons={persons} search={search} deleteEventHandler={delete_onClick} />
		</>
	)

}



export default App