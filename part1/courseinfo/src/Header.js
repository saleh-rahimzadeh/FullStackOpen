import React from 'react';



function Header(props) {
	console.log('Rendering Header...')

	return (
		<h1>{props.Course}</h1>
	)
}



export default Header;