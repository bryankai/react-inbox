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
        selectAll: "none"     // all, some, none
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

  handleSelectAllIconLoad = (messagesData,toolbarData) => {
    // Find out how many messages are selected
    const selectCount = messagesData.reduce((acc, message) => {
      if (message.selected) acc++
      return acc
    }, 0)
    console.log(selectCount, messagesData.length)
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

    console.log(this.state.toolbar.selectAll)
    ////// Next few lines cause this function to continue to be called because
    ////// the state is changesd
    this.setState( {
      messages: messagesData,
      toolbar: {
        selectAll: selected     // checked, halfchecked, unchecked
      } } )
    return classes
  }

  handleSelectAllIconChange = (messagesData,toolbarData) => {
    // Find out how many messages are selected
    const selectCount = messagesData.reduce((acc, message) => {
      if (message.selected) acc++
      return acc
    }, 0)
    console.log(selectCount, messagesData.length)
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

    console.log(this.state.toolbar.selectAll)
    ////// Next few lines cause this function to continue to be called because
    ////// the state is changesd
    // this.setState( {
    //   messages: messagesData,
    //   toolbar: {
    //     selectAll: selected     // checked, halfchecked, unchecked
    //   } } )
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
    this.setState( {
      messages: this.state.messages.map(ele => ({...ele, selected: messageSelected } ) ),
      toolbar: {selectAll: 'selected'}
     } )
  }

  test = (text) => {
    console.log(text)
  }

  handleMessageRead = (readStatus) => {
  }

  // Mounting Methods
  componentWillMount() {
    console.log('CandidateList Will mount')
    this.handleSelectAllIconLoad(this.state.messages, this.state.toolbar)
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar
            toolbarData={this.state.toolbar}
            messagesData={this.state.messages}
            handleSelectAll={this.handleSelectAll}
            handleSelectAllIconChange={this.handleSelectAllIconChange}
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
