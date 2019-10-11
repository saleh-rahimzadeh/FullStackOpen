import React from 'react';
import Header   from './Header';
import Content  from './Content';



const Course = ({ course }) => {
	console.log('Rendering Course...')

	return (
		<>
			<Header Course={course.name} />
	    	<Content Parts={course.parts} />
	    </>
	)
}



export default Course