import React, { Component } from 'react';
// import messagesData from './messagesData.json'
import Toolbar from './components/Toolbar.js'
import ComposeForm from './components/ComposeForm.js'
import Messages from './components/Messages.js'
import MessageAPI from './api/MessageAPI'
import './App.css';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      composeFormDisplayed: false,
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
    this.setState({messages: newMessagesData})
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
  handleApplyLabel = async (selectedMessages, selectedLabel) => {
    const selectedIds = selectedMessages.map(message => message.id)
    await MessageAPI.patch({messageIds:selectedIds, command: "addLabel", label: selectedLabel})
    this.updateState()
  }
  // Need to add API routes
  handleRemoveLabel = async (selectedMessages, labelToRemove) => {
    const selectedIds = selectedMessages.map(message => message.id)
    await MessageAPI.patch({messageIds:selectedIds, command: "removeLabel", label: labelToRemove})
    this.updateState()
  }

  // Display Compose Form
  handleComposeFormToggle = () => {
    this.setState({composeFormDisplayed: !this.state.composeFormDisplayed})
  }

  // Create a New Message
  handleComposeMessage = async (event) => {
    const {subject, body} = event.target
    event.preventDefault();
    console.log(subject.value, body.value)
    await MessageAPI.post({subject: subject.value, body: body.value})
    this.updateState()
    this.setState({ composeFormDisplayed: false })
  }

  // Render
  render() {
    const selectedMessages = (this.state.messages ?
      this.state.messages.filter(message => message.selected) :
      this.state.messages)
    const unreadMessages = (this.state.messages ?
      this.state.messages.filter(message => !message.read) :
      this.state.messages)
    console.log(this.state)
    return (
      <div className="App">
        <div className="container">
          <Toolbar
            selectedMessages={selectedMessages}
            unreadMessages={unreadMessages}
            messagesData={this.state.messages}
            handleComposeFormToggle={this.handleComposeFormToggle}
            handleSelectAll={this.handleSelectAll}
            handleReadSelected={this.handleReadSelected}
            handleUnreadSelected={this.handleUnreadSelected}
            handleDeleteSelected={this.handleDeleteSelected}
            handleApplyLabel={this.handleApplyLabel}
            handleRemoveLabel={this.handleRemoveLabel}
          />
          {this.state.composeFormDisplayed ?
            <ComposeForm
              handleComposeMessage={this.handleComposeMessage}
            />
            : null}
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
