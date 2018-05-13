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
      toolbar: {
        selectAll: "none",     // all, some, none

      }
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
  }

  handleSelectAllIconLoad = (messagesData,toolbarData) => {
    // Find out how many messages are selected
    console.log(this.state)
    console.log(messagesData)
    const selectCount = messagesData.reduce((acc, message) => {
      if (message.selected) acc++
      return acc
    }, 0)
    let selected
    let classes
    // If no messages are selected
    if (selectCount===0) {
      selected='none'
      classes="fa fa-square-o"
    // If all messages are selected
    } else if (selectCount===messagesData.length) {
      selected='all'
      classes="fa fa-check-square-o"
    // If some messages are selected
    } else {
      selected='some'
      classes="fa fa-minus-square-o"
    }
    const newState = {
      ...this.state, messages: messagesData,
      toolbar: {
        selectAll: selected,     // checked, halfchecked, unchecked
      } }
    this.setState(newState)
    return classes
  }

  handleSelectAllIconChange = (messagesData,toolbarData) => {
    // Find out how many messages are selected
    const selectCount = messagesData.reduce((acc, message) => {
      if (message.selected) acc++
      return acc
    }, 0)
    let classes
    // If no messages are selected
    if (selectCount===0) {
      classes="fa fa-square-o"
    // If all messages are selected
    } else if (selectCount===messagesData.length) {
      classes="fa fa-check-square-o"
    // If some messages are selected
    } else {
      classes="fa fa-minus-square-o"
    }
    return classes
  }

  handleSelectAll = (messagesData, toolbarData) => {
    let messageSelected
    let selected
    if (toolbarData.selectAll==="none" || toolbarData.selectAll==="some") {
      messageSelected = true
      selected = 'all'
    } else if (toolbarData.selectAll==="all") {
      messageSelected = false
      selected = 'none'
    } else {
      messageSelected = false
      selected = 'none'
    }
    console.log(selected)

    const newState = {
      ...this.state,
      messages: this.state.messages.map(ele => ({...ele, selected: messageSelected } ) ),
      toolbar: {
        selectAll: selected     // checked, halfchecked, unchecked
      }
    }
    this.setState(newState)
  }

  test = (text) => {
    console.log(text)
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
    const newMessagesData = messagesData.filter((message)=> !message.selected)
    this.setState({
      ...this.state,
      messages: newMessagesData,
    })
  }

  // Mounting Methods
  componentWillMount() {
    console.log('componentWillMount')
    this.handleSelectAllIconLoad(this.state.messages, this.state.toolbar)
  }

  // Render
  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar
            toolbarData={this.state.toolbar}
            messagesData={this.state.messages}
            handleSelectAll={this.handleSelectAll}
            handleSelectAllIconChange={this.handleSelectAllIconChange}
            handleReadSelected={this.handleReadSelected}
            handleUnreadSelected={this.handleUnreadSelected}
            handleDeleteSelected={this.handleDeleteSelected}
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
