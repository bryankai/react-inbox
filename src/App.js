import React, { Component } from 'react';
// import messagesData from './messagesData.json'
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'
import MessageAPI from './api/MessageAPI'
import './App.css';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      messages: [],  // Setting the state to be the current todo list
      // [...
      //  {
      //    "id": 4,
      //    "subject": "We need to program the primary TCP hard drive!",
      //    "read": true,
      //    "starred": false,
      //    "selected": true,
      //    "labels": []
      //  },
      // ...]
    }
  }

  // Update State with getAll Messages
  updateState = async () => {
    //Async and await so we can setState AFTER we get the data
    const messageResponse = await MessageAPI.get()
    this.setState({ messages: await messageResponse.data })
  }


  // Mounting Methods
  componentWillMount = () => {
    this.updateState()
  }



// Don't need to store this in the DB
  handleSelected = (id, selected) => {
    // Changes the checkbox
    const newMessagesData = this.state.messages.map(ele => ele.id === id ? {...ele, selected} : {...ele})
    // MessageAPI.put(id, newMessagesData)
    this.setState({ ...this.state, messages: newMessagesData})
    // this.updateState()
  }

  handleStarred = async (id) => {
    await MessageAPI.patch({messageIds:[id], command:"star"})
    this.updateState()
  }

  //////////////////////////
  // METHODS FOR TOOLBAR ///
  //////////////////////////

  handleSelectAll = (selectedMessages) => {
    let messageSelected
    // If no messages are selected
    if (selectedMessages.length===0) {
      messageSelected = true
    // If all messages are selected
    } else if (selectedMessages.length===this.state.messages.length) {
      messageSelected = false
    // If some messages are selected
    } else {
      messageSelected = true
    }
    const newState = {
      messages: this.state.messages.map(ele => ({...ele, selected: messageSelected } ) )
    }
    this.setState(newState)
  }

  handleReadSelected= async (selectedMessages) => {
    const selectedIds = selectedMessages.map(message => message.id)
    console.log(selectedIds)
    await MessageAPI.patch({messageIds:selectedIds, command:"read", read:true})
    this.updateState()
  }

  handleUnreadSelected= async (selectedMessages) => {
    const selectedIds = selectedMessages.map(message => message.id)
    await MessageAPI.patch({messageIds:selectedIds, command:"read", read:false})
    this.updateState()
  }

  handleDeleteSelected= async (selectedMessages) => {
    const selectedIds = selectedMessages.map(message => message.id)
    await MessageAPI.patch({messageIds:selectedIds, command:"delete"})
    this.updateState()
  }

  // Need to add API routes
  handleApplyLabel = (selectedlabel) => {
    const newMessagesData = this.state.messages.map((message)=> {
      if(message.selected)
        // If the selected message does not have the label, add it
        if(!message.labels.some((label)=> label===selectedlabel)) {
          message.labels = [...message.labels, selectedlabel]
        }
      return message
    })
    this.setState({
      messages: newMessagesData
    })
  }
  // Need to add API routes
  handleRemoveLabel = (labelToRemove) => {
    const newMessagesData = this.state.messages.map((message)=> {
      if(message.selected) {
        // If message has the label, then remove the label
        const newLabels = message.labels.filter(label => {
          return label !== labelToRemove})
        message.labels = newLabels
      }
      return message
    })
    this.setState({
      messages: newMessagesData
    })
  }

  // Create a new message
  handleComposeMessage = () => {

  }

  // Render
  render() {
    const selectedMessages = (this.state.messages ?
      this.state.messages.filter(message => message.selected) :
      this.state.messages)
    const unreadMessages = (this.state.messages ?
      this.state.messages.filter(message => !message.read) :
      this.state.messages)
    return (
      <div className="App">
        <div className="container">
          <Toolbar
            selectedMessages={selectedMessages}
            unreadMessages={unreadMessages}
            messagesData={this.state.messages}
            handleSelectAll={this.handleSelectAll}
            handleReadSelected={this.handleReadSelected}
            handleUnreadSelected={this.handleUnreadSelected}
            handleDeleteSelected={this.handleDeleteSelected}
            handleApplyLabel={this.handleApplyLabel}
            handleRemoveLabel={this.handleRemoveLabel}
          />
          <Messages
            messagesData={this.state.messages}
            handleSelected={this.handleSelected}
            handleStarred={this.handleStarred}
          />
        </div>
      </div>
    );
  }
}

export default App;
