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
  console.log('Part1: 2')
  console.log('Starting Application [' + (new Date()).toLocaleTimeString() + ']')

  // Data difinitions
  const course     = 'Half Stack application development'
  const part1      = 'Fundamentals of React'
  const exercises1 = 10
  const part2      = 'Using props to pass data'
  const exercises2 = 7
  const part3      = 'State of a component'
  const exercises3 = 14

  console.log('Rendering Application...')

  // Rendering Components
  return (
    <div>    
    	<Header Course={course} />
    	<Content Part1={part1} Part2={part2} Part3={part3} Exercise1={exercises1} Exercise2={exercises2} Exercise3={exercises3} />
    	<Total Exercises={exercises1 + exercises2 + exercises3} />
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'));