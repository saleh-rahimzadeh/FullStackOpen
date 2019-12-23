import React       from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
  if (props.message === null || props.message === undefined || props.message === '') {
    return null
  }

  return (
    <p className={props.isError === true ? 'error' : 'success'}>
      {props.message}
    </p>
  )
}


const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    isError: state.notification.isError
  }
}


export default connect(
  mapStateToProps,
  null
)(Notification)