import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js'
import Messages from './components/Messages.js'
import './App.css';

import messagesData from './messagesData.json'
console.log(messagesData);

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      messages: messagesData  // Setting the state to be the current todo list
    }
  }

  handleMessageCheckbox = (id, checked) => {
    console.log(id, checked)
    // Changes the checkbox
    const newTodoList = this.state.messages.map(ele => ele.id === id ? {...ele, checked} : {...ele})
    this.setState({ todo: newTodoList})
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
            // handleToolbarCheckbox={this.handleToolbarCheckbox}
            handleMessageCheckbox={this.handleMessageCheckbox}
            messagesData={this.state.messages} />
        </div>
      </div>
    );
  }
}

export default App;
