import React         from 'react'
import CountryButton from './CountryButton'



const CountriesList = ({ countries, countryEventHandler }) => {
	console.log('Rendering CountriesList...')

	const rows = countries.map(country => 
		<li key={country.name}>{country.name} <CountryButton countryName={country.name} countryEventHandler={countryEventHandler} /></li>
	)

	return (
		<ul>
			{rows}
		</ul>
	)
}



export default CountriesList