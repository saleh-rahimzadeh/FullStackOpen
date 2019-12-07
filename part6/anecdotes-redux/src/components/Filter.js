import React from 'react'
import { connect } from 'react-redux'
import { doFilter } from '../reducers/filterReducer'


const Filter = (props) => {
  const handleChange = (event) => {
    props.doFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }


  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const mapDispatchToProps = {
  doFilter
}


export default connect(
  null,
  mapDispatchToProps
)(Filter)