import React  from 'react';
import Course from './components/Course'



const App = () => {

  // Data difinitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Test message',
        exercises: 1,
        id: 4
      },
      {
        name: 'Node.js',
        exercises: 15,
        id: 5
      }
    ]
  }


  console.log('Rendering Application...')

  // Rendering Components
  return (
    <div>
      <Course course={course} />
    </div>
  )

}



export default App