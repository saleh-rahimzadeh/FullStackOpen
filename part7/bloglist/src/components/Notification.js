import React       from 'react'
import { connect } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'


const Notification = (props) => {
  if (props.message === null || props.message === undefined || props.message === '') {
    return null
  }

  return (
    <Container>
      {
        props.isError === true ? <Message error>{props.message}</Message> : <Message success>{props.message}</Message>
      }
    </Container>
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