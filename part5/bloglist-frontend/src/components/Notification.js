import React from 'react'



const Notification = ({ notice }) => {
  if (notice === null || notice === undefined) {
    return null
  }

  return (
    <p className={notice.isError === true ? 'error' : 'success'}>
      {notice.message}
    </p>
  )
}



export default Notification