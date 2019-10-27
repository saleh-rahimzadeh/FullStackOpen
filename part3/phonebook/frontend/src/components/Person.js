import React from 'react';



const Person = ({ Name, Number, deleteEventHandler }) => {
	console.log('Rendering Person...')

	return (
		<div>
			{Name} : {Number} <button onClick={deleteEventHandler}>delete</button>
		</div>
	)
}



export default Person