import React from 'react';



const Person = ({ Name, Number }) => {
	console.log('Rendering Person...')

	return (
		<div>
			{Name} : {Number}
		</div>
	)
}



export default Person