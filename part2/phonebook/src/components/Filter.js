import React from 'react';



const Filter = ({ search, searchEventHandler }) => {
	console.log('Rendering Filter...')

	return (
		<div>
			filter shown with <input value={search} onChange={searchEventHandler} />
		</div>
	)
}



export default Filter