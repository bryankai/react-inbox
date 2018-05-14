// 1. import React
import React from 'react'

// 2. Create a function
const Toolbar = ({
  selectedMessages,
  unreadMessages,
  messagesData,
  handleSelectAll,
  handleReadSelected,
  handleUnreadSelected,
  handleDeleteSelected,
  handleApplyLabel,
  handleRemoveLabel
}) => {
  // 3. Return some JSX
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessages.length}</span>
          unread messages
        </p>

        <button
          className="btn btn-default"
          onClick={(event)=> handleSelectAll(selectedMessages, messagesData)}
          >
          <i className={selectAllIcon(selectedMessages,messagesData)}>
          </i>
        </button>

        <button
          className="btn btn-default"
          disabled = {selectedMessages.length===0 ? 'disabled' : false}
          onClick={(event)=>handleReadSelected(selectedMessages)}
          >
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled = {selectedMessages.length===0 ? 'disabled' : false}
          onClick={(event)=>handleUnreadSelected(selectedMessages)}
          >
          Mark As Unread
        </button>

        <select
          className="form-control label-select"
          disabled = {selectedMessages.length===0 ? 'disabled' : false}
          onChange = {(event)=> handleApplyLabel(event.target.value)}
        >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select
          className="form-control label-select"
          disabled = {selectedMessages.length===0 ? 'disabled' : false}
          onChange = {(event)=> handleRemoveLabel(event.target.value)}
        >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button
          className="btn btn-default"
          disabled = {selectedMessages.length===0 ? 'disabled' : false}
          onClick={(event)=>handleDeleteSelected(selectedMessages)}
          >
          <i
            className="fa fa-trash-o"
          >
          </i>
        </button>
      </div>
    </div>
  )
}

// Concatonates classes
const selectAllIcon = (selectedMessages,messagesData) => {
    // Find out how many messages are selected
    let classes
    // If no messages are selected
    if (selectedMessages.length===0) {
      classes="fa fa-square-o"
    // If all messages are selected
    } else if (selectedMessages.length===messagesData.length) {
      classes="fa fa-check-square-o"
    // If some messages are selected
    } else {
      classes="fa fa-minus-square-o"
    }
    return classes
}

// 4. export
export default Toolbar
