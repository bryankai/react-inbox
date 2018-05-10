// 1. import React
import React from 'react'
import Label from './Label.js'

// 2. Create a function
const Message = ({subject, read, starred, selected, labels}) => {

  const labelsList = labels.map((label,i) => {
    console.log('label',label)
    // Label is a string
    return <Label key={i} label={label} />
  })

  return (
    <div className={messageStyling(read, selected)}>
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
        {labelsList}
        <div>
          {subject}
        </div>
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

// Add Labels
function addLabels (labels) {
  return <span class="label label-warning">dev</span>
}


// 4. export
export default Message
