import React from 'react';
import Part  from './Part';



function Content(props) {
	console.log('Rendering Content...')

	return (
	    <>
	      <Part Name={props.Part1.name} Number={props.Part1.exercises} />
	      <Part Name={props.Part2.name} Number={props.Part2.exercises} />
	      <Part Name={props.Part3.name} Number={props.Part3.exercises} />
	    </>
	)
}



export default Content;