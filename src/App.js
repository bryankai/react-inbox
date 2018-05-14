import React, { Component } from 'react';
import messagesData from './messagesData.json'
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'
import './App.css';


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      messages: messagesData,  // Setting the state to be the current todo list
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

  handleSelected = (id, selected) => {
    // Changes the checkbox
    const newMessagesData = this.state.messages.map(ele => ele.id === id ? {...ele, selected} : {...ele})
    this.setState({ ...this.state, messages: newMessagesData})
  }

  handleStarred = (id, className) => {
    console.log('clicked')
    console.log(className)
    const starred = (className==="star fa fa-star-o") ? true : false
    const newMessagesData = this.state.messages.map(ele => ele.id === id ? {...ele, starred} : {...ele})

    this.setState({
      ...this.state,
      messages: newMessagesData,
    })
    console.log(this.state);
  }


  handleSelectAll = (selectedMessages,messagesData) => {
    let messageSelected
    // If no messages are selected
    if (selectedMessages.length===0) {
      messageSelected = true
    // If all messages are selected
    } else if (selectedMessages.length===messagesData.length) {
      messageSelected = false
    // If some messages are selected
    } else {
      messageSelected = true
    }
    const newState = {
      ...this.state,
      messages: this.state.messages.map(ele => ({...ele, selected: messageSelected } ) )
    }
    this.setState(newState)
  }

  handleReadSelected= (messagesData) => {
    const newMessagesData = messagesData.map((message)=> {
      message.read = message.selected ? true : message.read
      return message
    })
    this.setState({
      ...this.state,
      messages: newMessagesData,
    })
  }

  handleUnreadSelected= (messagesData) => {
    const newMessagesData = messagesData.map((message)=> {
      message.read = message.selected ? false : message.read
      return message
    })
    this.setState({
      ...this.state,
      messages: newMessagesData,
    })
  }

  handleDeleteSelected= (messagesData) => {
    console.log('selected to delete', messagesData)
    const newMessagesData = messagesData.filter((message)=> !message.selected)
    this.setState({
      ...this.state,
      messages: newMessagesData,
    })
  }

  handleApplyLabel = (label) => {
    const newMessagesData = this.state.messages.map((message)=> {
      if(message.selected)
        // If the selected message does not have the label, add it
        if(!message.labels.some((ele)=> ele===label)) {
          message.labels = [...message.labels, label]
        }
      return message
    })
    this.setState({
      ...this.state,
      messages: newMessagesData
    })
  }

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
      ...this.state,
      messages: newMessagesData
    })
  }

  // Mounting Methods
  componentWillMount() {
    console.log('componentWillMount')
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
