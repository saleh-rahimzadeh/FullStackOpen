import React, { useState }  from 'react';



const Person = ({ Name }) => {
	return (
		<div>
			{Name}
		</div>
	)
}



const App = () => {

	/* Util Functions */
	const createNewObject = (newName) => {
		return {
			name: newName
		}
	}


	/* Defining States */
	const [ persons, setPersons ] = useState([
		createNewObject('Arto Hellas')
	]) 
	const [ newName, setNewName ] = useState('')


	/* Defining Event Handlers */
	const newName_onChange = (event) => {
		setNewName(event.target.value)
	}

	const addName_onSubmit = (event) => {
		event.preventDefault()

		if (persons.map(person => person.name).includes(newName)) {
			alert(`${newName} is already added to phonebook`)
			return
		}

		setPersons(persons.concat(createNewObject(newName)))
		setNewName('')
	}


	/* Data */
	const Persons = () => persons.map(person => <Person key={person.name} Name={person.name} />)
  

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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {Persons()}
    </>
  )

}



export default App