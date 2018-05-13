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
        selectAll: ""     // checked, halfchecked, unchecked
      }
    }
  }

  handleSelected = (id, selected) => {
    // Changes the checkbox
    const newMessagesData = this.state.messages.map(ele => ele.id === id ? {...ele, selected} : {...ele})
    this.setState({ messages: newMessagesData})
  }

  handleStarred = (id, className) => {
    console.log('clicked')
    console.log(className)
    const starred = (className==="star fa fa-star-o") ? true : false
    const newMessagesData = this.state.messages.map(ele => ele.id === id ? {...ele, starred} : {...ele})

    this.setState({ messages: newMessagesData})
    console.log(this.state.messages)
  }



  handleSelectAllIconChange = (messagesData,toolbarData) => {
    // Find out how many messages are selected

    // If all messages are selected, selectAll = "all"

    // If all messages are selected, selectAll = "some"

    // If all messages are selected, selectAll = "none"

    // "fa fa-check-square-o"
    // console.log('toolbarSelected',toolbarSelected)
    // if(toolbarSelected==="some" || toolbarSelected==="some") {
    //   toolbarSelected="all"
    // } else {
    //   toolbarSelected="none"
    // }
    if(toolbarData.selected==='')
    this.setState( { toolbar: 'some' } )
  }

  handleSelectAll = (messagesData) => {
    console.log('selectAll!')
    this.setState( { messages: this.state.messages.map(ele => ({...ele, selected: 'true' } ) ) } )
    // if (toolbarSelected==="checked") {
    //   const messageSelected = true
    //   // Change the button
    //   // Render the message checkboxes
    //   this.setState( { checkbox: this.state.messages.map(ele => ({...ele, selected: messageSelected } ) ) } )
    //   // Render the toolbar checkbox
    //   this.setState( { toolbar: newSelectAll })
    //
    // } else if (toolbarSelected==="unchecked") {
    //   const messageSelected = false
    //   // update toolbar status
    // } else {
    //   // third case
    //   // Render the message checkboxes
    //   this.setState( { checkbox: this.state.messages.map(ele => ({...ele, selected: messageSelected } ) ) } )
    //   // Render the toolbar checkbox
    //   this.setState( { toolbar: newSelectAll
    // }
    //
    //
    // })
  }

  test = (text) => {
    console.log(text)
  }

  handleMessageRead = (readStatus) => {
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar
            toolbarData={this.state.toolbar}

            messagesData={this.state.messages}
            handleSelectAll={this.handleSelectAll}
            // handleSelectAllIconChange={this.handleSelectAllIconChange}
            test={this.test}
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
