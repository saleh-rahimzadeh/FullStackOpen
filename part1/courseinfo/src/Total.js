import React from 'react';



const Total = (props) => {
	console.log('Rendering Total...')

	return (
		<p><strong>Number of exercises = {props.Parts[0].exercises + props.Parts[1].exercises + props.Parts[2].exercises} </strong></p>
	)
}



export default Total;