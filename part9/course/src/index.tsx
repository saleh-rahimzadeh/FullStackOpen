import React from "react";
import ReactDOM from "react-dom";
import Total    from './Total';
import Header   from './Header';
import Content  from './Content';



const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  console.log('Rendering Application...')

  // Rendering Components
  return (
    <div>    
    	<Header name={courseName} />
    	<Content parts={courseParts} />
    	<Total count={(courseParts.reduce((acc, value) => acc + value.exerciseCount, 0))} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));