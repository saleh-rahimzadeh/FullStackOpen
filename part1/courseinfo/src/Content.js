import React from 'react';



function Content(props) {
	console.log('Rendering Content...')

	return (
		<>
	  <p>
        {props.Part1} {props.Exercise1}
      </p>
      <p>
        {props.Part2} {props.Exercise2}
      </p>
      <p>
        {props.Part3} {props.Exercise3}
      </p>
      </>
	)
}



export default Content;