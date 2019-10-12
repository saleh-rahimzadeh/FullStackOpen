import React  from 'react';
import CoursesArray from './components/CoursesArray'
import Course from './components/Course'



const App = () => {

  const rows = () => CoursesArray.map(item => <Course key={item.id} course={item} />)


  console.log('Rendering Application...')

  // Rendering Components
  return (
    <div>
      {rows()}
    </div>
  )

}



export default App