// 1. import React
import React from 'react'

// 2. Create a function
const Toolbar = ({
  toolbarData,
  messagesData,
  handleSelectAll,
  handleSelectAllIconChange,
  handleReadSelected,
  handleUnreadSelected
}) => {
  // 3. Return some JSX
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">2</span>
          unread messages
        </p>

        <button
          className="btn btn-default"
          onClick={(event)=> handleSelectAll(messagesData, toolbarData)}
          >
          <i className={handleSelectAllIconChange(messagesData, toolbarData)}>
          </i>
        </button>

        <button
          className="btn btn-default"
          disabled = {toolbarData.selectAll==='none' ? 'disabled' : false}
          onClick={(event)=>handleReadSelected(messagesData,toolbarData)}
          >
          Mark As Read
        </button>

        <button
          className="btn btn-default"
          disabled = {toolbarData.selectAll==='none' ? 'disabled' : false}
          onClick={(event)=>handleUnreadSelected(messagesData,handleUnreadSelected)}
          >
          Mark As Unread
        </button>

        <select className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default">
          <i
            className="fa fa-trash-o"
          >
          </i>
        </button>
      </div>
    </div>
  )
}

// 4. export
export default Toolbar
