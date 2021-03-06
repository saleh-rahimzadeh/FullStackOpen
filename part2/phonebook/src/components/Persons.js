import React  from 'react';
import Person from './Person'



const Persons = ({ persons, search, deleteEventHandler }) => {
	console.log('Rendering Persons...')

	const Persons = () => persons.filter(person => search === '' ? true : person.name.toUpperCase().includes(search.toUpperCase())).map(person => <Person key={person.id} Name={person.name} Number={person.number} deleteEventHandler={() => {deleteEventHandler(person)}} />)

	return (
		<div>
			{Persons()}
		</div>
	)
}



export default Persons