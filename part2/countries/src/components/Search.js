import React from 'react'



const Search = ({ keyword, searchEventHandler }) => {
	console.log('Rendering Search...')

	return (
		<div>
			find countries <input value={keyword} onChange={searchEventHandler} />
		</div>
	)
}



export default Search