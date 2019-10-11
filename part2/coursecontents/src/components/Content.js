import React from 'react';
import Part  from './Part';



function Content({ Parts }) {
	console.log('Rendering Content...')

	const rows = () => Parts.map(item => <Part key={item.id} Name={item.name} Number={item.exercises} />)

	return (
	    <>
	      {rows()}
	    </>
	)	
}



export default Content;