import React from 'react'
import Label from './Label.js'

const Message = (props) => {
  const {message, handleSelected, handleStarred} = props
  const {id, subject, read, starred, selected, labels} = message

  const labelsList = labels.map((label,i) => {
    // Label is a string
    return <Label key={i} label={label} />
  })

  return (
    <div className={messageStyling(read, selected)}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input
              type="checkbox"
              checked={selected ? "checked": ""}
              onChange = {(event) => handleSelected(id, event.target.checked)}
            />
          </div>
          <div className="col-xs-2">
            <i
              className={starred ? "star fa fa-star" : "star fa fa-star-o"}
              onClick = {(event) => handleStarred(id, event.target.className)}
            >
            </i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labelsList}
        <a href="#">
          {subject}
        </a>
      </div>
    </div>
  )
}

// Concatonates classes
function messageStyling(read, selected) {
  const staticClass = ['row', 'message']
  const readClass = read ? "read" : "unread"
  const selectedClass = selected ? "selected" : ""
  return [...staticClass, readClass, selectedClass].join(' ')
}

export default Message
