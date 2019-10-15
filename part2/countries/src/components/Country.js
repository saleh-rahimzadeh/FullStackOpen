import React from 'react'



const Country = ({ CountryObj }) => {
	console.log('Rendering Country...')

	const languages = CountryObj.languages.map(lang => <li key={lang.name}>{lang.name}</li>)

	return (
		<div>
			<h1>{CountryObj.name}</h1>
			
			<p>
				Capital : {CountryObj.capital}
				<br />
				Population : {CountryObj.population}
			</p>

			<p><strong>Languages</strong></p>
			<ul>
				{languages}
			</ul>

			<img src={CountryObj.flag} alt={CountryObj.name} width="150" />
		</div>
	)
}



export default Country