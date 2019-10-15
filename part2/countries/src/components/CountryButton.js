import React from 'react'



const CountryButton = ({ countryName, countryEventHandler }) => {
	console.log('Rendering CountryButton...')

	const button_onClick = () => {
		countryEventHandler(countryName)
	}

	return (
		<button onClick={button_onClick}>Show</button>
	)
}



export default CountryButton