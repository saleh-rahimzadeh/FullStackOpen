import React from 'react';



const Part = (props) => {
	console.log('Rendering Part...')

	return (
		<p> {props.Name} : {props.Number} </p> 
	)
}



export default Part;