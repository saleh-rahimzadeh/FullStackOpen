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
		createNewObject('Arto Hellas', '040-1234567')
	]) 
	const [ newName, setNewName ]     = useState('')
	const [ newNumber, setNewNumber ] = useState('')


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


	/* Data */
	const Persons = () => persons.map(person => <Person key={person.name} Name={person.name} Number={person.number} />)
  

  /* Rendering Components */
  console.log('Rendering Application...')

  return (
    <>
      <h2>Phonebook</h2>
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