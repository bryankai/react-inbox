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
      messages: [],
      // Message Format:
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

  //////////////////////////
  ///// HELPER METHODS /////
  //////////////////////////

  // Update State with messages from server
  updateState = async () => {
    //Async and await so we can setState AFTER we get the data
    const messageResponse = await MessageAPI.get()
    // Reverse changes the order of the messages so that the newest message is on top.
    this.setState({ messages: await messageResponse.data.reverse() })
  }

  // Returns description of how many messages are selected ('none', 'all', or 'some')
  amountOfSelectedMessages = () => {
    // If no messages are selected
    if (this.state.messages.every(ele => !ele.selected)) {
        return 'none'
    // If all messages are selected
    } else if (this.state.messages.every(ele => ele.selected)) {
        return 'all'
    // If some messages are selected
    } else{
        return 'some'
      }
  }

  // Returns array of Selected Ids
  getSelectedIds = () => {
    return this.state.messages.filter(message => message.selected).map(message => message.id)
  }

  // Returns array of Unread Messages
  getUnreadMessages = () => {
    return this.state.messages.filter(message =>!message.read)
  }


  //////////////////////
  // MOUNTING METHODS //
  //////////////////////
  componentWillMount = () => {
    this.updateState()
  }


  /////////////////////
  // Message Methods //
  /////////////////////

  // Checkmarks the selected checkbox
  handleSelected = (id, selected) => {
    const newMessagesData = this.state.messages.map(ele => ele.id === id ? {...ele, selected} : {...ele})
    // Change the state.  Don't need to update the server data.
    this.setState({messages: newMessagesData})
  }

  // Star a message
  handleStarred = async (id) => {
    await MessageAPI.patch({messageIds:[id], command:"star"})
    this.updateState()
  }


  //////////////////////////
  // METHODS FOR TOOLBAR ///
  //////////////////////////

  // Select All Button
  handleSelectAll = () => {
    // Select All unless All are selected
    const selected = this.amountOfSelectedMessages()!=='all'
    const newState = { messages: this.state.messages.map(ele => ({...ele, selected: selected } ) ) }
    this.setState(newState)
  }

  // Mark as Read Button
  handleReadSelected = async () => {
    await MessageAPI.patch({messageIds: this.getSelectedIds(), command:"read", read:true})
    this.updateState()
  }

  // Mark as Unread Button
  handleUnreadSelected = async () => {
    await MessageAPI.patch({messageIds: this.getSelectedIds(), command:"read", read:false})
    this.updateState()
  }

  // Delete Message Button
  handleDeleteSelected = async () => {
    await MessageAPI.patch({messageIds: this.getSelectedIds(), command:"delete"})
    this.updateState()
  }

  // Apply Label Button
  handleApplyLabel = async (selectedLabel) => {
    await MessageAPI.patch({messageIds: this.getSelectedIds(), command: "addLabel", label: selectedLabel})
    this.updateState()
  }

  // Remove Label Button
  handleRemoveLabel = async (labelToRemove) => {
    await MessageAPI.patch({messageIds: this.getSelectedIds(), command: "removeLabel", label: labelToRemove})
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
    await MessageAPI.post({subject: subject.value, body: body.value})
    this.updateState()
    this.setState({ composeFormDisplayed: false })
  }

  // Render
  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar
            getUnreadMessages={this.getUnreadMessages}
            handleComposeFormToggle={this.handleComposeFormToggle}
            handleSelectAll={this.handleSelectAll}
            amountOfSelectedMessages={this.amountOfSelectedMessages}
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
