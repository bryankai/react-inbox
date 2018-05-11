import React, { Component } from 'react';
import messagesData from './messagesData.json'
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'
import './App.css';

const toolbar = {
  // selectAll: 'all'     // checked, half-checked, unchecked

}

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
      toolbar: toolbar
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

  handleToolbarCheckbox = (checked) => {
    this.setState( { todoItems: this.state.toolbar.map(ele => ({...ele, checked } ) ) } )
  }

  handleMessageRead = (readStatus) => {
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar />
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
