/*
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#  Created by Saleh Rahimzadeh                                                 #
#  Copyright (C) 2019                                                          #
#  https://saleh.sleek.page                                                    #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
*/

import React    from 'react';
import ReactDOM from 'react-dom';
import Header   from './Header';
import Content  from './Content';
import Total    from './Total';



const App = () => {
  console.log('Part1: 5')
  console.log('Starting Application [' + (new Date()).toLocaleTimeString() + ']')

  // Data difinitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log('Rendering Application...')

  // Rendering Components
  return (
    <div>    
    	<Header Course={course.name} />
    	<Content Parts={course.parts} />
    	<Total Parts={course.parts} />
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));