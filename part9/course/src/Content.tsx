import React from 'react';
import { Part, PartProps } from './Part';


interface ContentProps {
	parts: PartProps[];
}

const Content: React.FC<ContentProps> = (props) => {
	return (
	    <>
	      <Part name={props.parts[0].name} exerciseCount={props.parts[0].exerciseCount} />
	      <Part name={props.parts[1].name} exerciseCount={props.parts[1].exerciseCount} />
	      <Part name={props.parts[2].name} exerciseCount={props.parts[2].exerciseCount} />
	    </>
	);
}


export default Content;