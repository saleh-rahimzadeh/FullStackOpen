import React from 'react';
import Header   from './Header';
import Content  from './Content';
import Total  from './Total';



const Course = ({ course }) => {
	console.log('Rendering Course...', course.id)

	return (
		<>
			<Header Course={course.name} />
	    	<Content Parts={course.parts} />
	    	<Total Parts={course.parts} />
	    </>
	)
}



export default Course