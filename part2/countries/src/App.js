import React, { useState, useEffect } from 'react'
import axios                          from 'axios'
import Search                         from './components/Search'
import Content                        from './components/Content'



const App = () => {

	/* Defining States */
	const [ countries, setCountries ]     = useState([]) 
	const [ search,    setSearch ]    = useState('')


	/* Defining Event Handlers */
	const search_onChange = (event) => {
		setSearch(event.target.value)
	}

	const country_onClick = (countryName) => {
		setSearch(countryName)
	}

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])  


	/* Rendering Components */
	console.log('Rendering Application...')

	return (
		<>
			<Search keyword={search} searchEventHandler={search_onChange} />
			<Content search={search} countries={countries} countryEventHandler={country_onClick} />
		</>
	)

}



export default App