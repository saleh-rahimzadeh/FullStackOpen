import React from 'react';
import Part  from './Part';



function Content(props) {
	console.log('Rendering Content...')

	return (
	    <>
	      <Part Name={props.Parts[0].name} Number={props.Parts[0].exercises} />
	      <Part Name={props.Parts[1].name} Number={props.Parts[1].exercises} />
	      <Part Name={props.Parts[2].name} Number={props.Parts[2].exercises} />
	    </>
	)
}



export default Content;