import React from 'react'



const CountriesList = ({ countries }) => {
	console.log('Rendering CountriesList...')

	const rows = countries.map(country => <li key={country.name}>{country.name}</li>)

	return (
		<ul>
			{rows}
		</ul>
	)
}



export default CountriesList