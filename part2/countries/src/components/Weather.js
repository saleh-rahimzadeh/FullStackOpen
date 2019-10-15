import React, { useState, useEffect } from 'react'
import axios                          from 'axios'



const Weather = ({ City }) => {
	console.log('Rendering Weather...')

	const [ weather, setWeather ] = useState([])


	useEffect(() => {
		const url = 'http://api.weatherstack.com/current?access_key=479ec324d4ddc405daa7b61a09aacdda&query=' + City
		axios
			.get(url)
			.then(response => {
				setWeather(response.data)
			})
	}, [City])


	if (!weather || weather.length === 0) {
		return (
			<p>Loading...</p>
		)
	}

	return (
		<div>
			<h3>Weather in {weather.location.name}</h3>
			<p><strong>temperature:</strong> {weather.current.temperature} clesius</p>
			<img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} width="50" />
			<p><strong>wind:</strong> {weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>
		</div>
	)
}



export default Weather