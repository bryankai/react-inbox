// 1. import React
import React from 'react'
import Message from './Message.js'

// 2. Create a function
const Messages = ({messagesData, handleSelected, handleStarred}) => {
  // console.log(messagesData)
  const messagesList = messagesData.reverse().map(message => {
    return <Message
      key={message.id}
      message={message}
      handleSelected={handleSelected}
      handleStarred={handleStarred}
    />
  })

  return (
    <div>
      {messagesList}
    </div>
  )
}



// 4. export
export default Messages
