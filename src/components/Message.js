// 1. import React
import React from 'react'

// 2. Create a function
const Message = ({subject, read, starred, selected, labels}) => {

  return (
    <div className={read ? "row message read" : "row message unread"}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className={starred ? "star fa fa-star" : "star fa fa-star-o"}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <div>
          {subject}
        </div>
      </div>
    </div>
  )
}



// 4. export
export default Message
