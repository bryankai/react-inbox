import React from 'react'

const Toolbar = ({
  getUnreadMessages,
  handleComposeFormToggle,
  handleSelectAll,
  amountOfSelectedMessages,
  handleReadSelected,
  handleUnreadSelected,
  handleDeleteSelected,
  handleApplyLabel,
  handleRemoveLabel
}) => {

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{getUnreadMessages().length}</span>
          unread messages
        </p>

        {/* Compose Button */}
        <a
          className="btn btn-danger"
          onClick={()=> handleComposeFormToggle()}
          >
          <i className="fa fa-plus"></i>
        </a>

        {/* Select All Button */}
        <button
          className="btn btn-default"
          onClick={()=> handleSelectAll()}
          >
          <i className={selectAllIcon(amountOfSelectedMessages())}>
          </i>
        </button>

        {/* Mark as Read */}
        <button
          className="btn btn-default"
          disabled = {amountOfSelectedMessages()==='none' ? 'disabled' : false}
          onClick={(event)=>handleReadSelected()}
          >
          Mark As Read
        </button>

        {/* Mark as Unread */}
        <button
          className="btn btn-default"
          disabled = {amountOfSelectedMessages()==='none' ? 'disabled' : false}
          onClick={(event)=>handleUnreadSelected()}
          >
          Mark As Unread
        </button>

        {/* Apply Label */}
        <select
          className="form-control label-select"
          disabled = {amountOfSelectedMessages()==='none' ? 'disabled' : false}
          onChange = {(event)=> handleApplyLabel(event.target.value)}
        >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        {/* Remove Label */}
        <select
          className="form-control label-select"
          disabled = {amountOfSelectedMessages()==='none' ? 'disabled' : false}
          onChange = {(event)=> handleRemoveLabel(event.target.value)}
        >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        {/* Delete */}
        <button
          className="btn btn-default"
          disabled = {amountOfSelectedMessages()==='none' ? 'disabled' : false}
          onClick={(event)=>handleDeleteSelected()}
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

// Choose correct Select All icon based on how many messages are selected
function selectAllIcon(selectedAmount){
  const classes = {
    'all': 'fa fa-check-square-o',
    'some': 'fa fa-minus-square-o',
    'none': 'fa fa-square-o'
  }
  return classes[selectedAmount]
}

export default Toolbar
