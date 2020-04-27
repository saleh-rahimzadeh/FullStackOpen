import React from 'react';


interface TotalProps {
	count: number;
}

const Total: React.FC<TotalProps> = (props) => {
	return (
		<p><strong>Number of exercises = {props.count}</strong></p>
	);
};


export default Total;