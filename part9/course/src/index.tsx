import React from "react";
import ReactDOM from "react-dom";
import { CoursePart } from './types';
import Total    from './Total';
import Header   from './Header';
import Content  from './Content';



const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Programming",
      exerciseCount: 20,
      description: "Course for programming",
      language: "JavaScript"
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
