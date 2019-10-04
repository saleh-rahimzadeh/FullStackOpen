import React from 'react';



const Total = (props) => {
	console.log('Rendering Total...')

	return (
		<p><strong>Number of exercises : {props.Exercises}</strong></p>
	)
}



export default Total;