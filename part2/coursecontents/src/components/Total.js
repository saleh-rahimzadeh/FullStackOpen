import React from 'react';



const Total = ({ Parts }) => {
	console.log('Rendering Total...')

	const total = () => Parts.map(part => part.exercises).reduce((sum, exercises) => sum += exercises)

	return (
		<p><strong>Total of {total()} exercises</strong></p>
	)
}



export default Total;