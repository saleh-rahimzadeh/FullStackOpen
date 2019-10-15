import React         from 'react'
import Country       from './Country'
import CountriesList from './CountriesList'



const Content = ({ search, countries }) => {
	console.log('Rendering Content...')
  

    /* Checking arguments */
    if (!search || search.trim() === '') {
        return (
            <p>Please enter country</p>
        )
    }

    if (!countries || countries.length === 0) {
        return (
            <p>Error: country list is empty</p>
        )
    }


    /* Searching for countries */
    const foundCountries = 
        countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))


    /* Countries conditions */
    if (foundCountries.length === 1) {
        return (
            <Country CountryObj={foundCountries[0]} />
        )
    } else if (foundCountries.length > 1 && foundCountries.length <= 10) {
        return (
            <CountriesList countries={foundCountries} />
        )
    } else if (foundCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

}



export default Content