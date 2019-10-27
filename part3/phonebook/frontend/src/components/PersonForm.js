import React from 'react';



const PersonForm = ({ newName, newNumber, addNameEventHandler, newNameEventHandler, newNumberEventHandler }) => {
	console.log('Rendering PersonForm...')

	return (
		<form onSubmit={addNameEventHandler}>
        <div>
          Name: <input value={newName} onChange={newNameEventHandler} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={newNumberEventHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}



export default PersonForm