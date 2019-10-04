import React from 'react';
import Part  from './Part';



function Content(props) {
	console.log('Rendering Content...')

	return (
	    <>
	      <Part Name={props.Part1} Number={props.Exercise1} />
	      <Part Name={props.Part2} Number={props.Exercise2} />
	      <Part Name={props.Part3} Number={props.Exercise3} />
	    </>
	)
}



export default Content;