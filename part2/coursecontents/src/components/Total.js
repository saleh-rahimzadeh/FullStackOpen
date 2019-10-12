import React from 'react';



const Total = ({ Parts }) => {
	console.log('Rendering Total...')

	const calculateSum = () => {
		let sum = 0
		Parts.forEach(item => sum += item.exercises)
		return sum
	}

	return (
		<p><strong>Total of {calculateSum()} exercises</strong></p>
	)
}



export default Total;