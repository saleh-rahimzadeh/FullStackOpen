import React from 'react';
import { Part } from './Part';
import { CoursePart } from './types';


interface ContentProps {
	parts: CoursePart[];
}

const Content: React.FC<ContentProps> = (props) => {
	return (
	    <>
				{
					props.parts.map(part => (<Part course={part} />))
				}
	    </>
	);
};


export default Content;
