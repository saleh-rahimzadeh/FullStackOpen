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
  console.log('Part1: 3')
  console.log('Starting Application [' + (new Date()).toLocaleTimeString() + ']')

  // Data difinitions
  const course     = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  console.log('Rendering Application...')

  // Rendering Components
  return (
    <div>    
    	<Header Course={course} />
    	<Content Part1={part1} Part2={part2} Part3={part3} />
    	<Total Exercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));