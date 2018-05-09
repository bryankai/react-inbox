// 1. import React
import React from 'react'
import Message from './Message.js'

// 2. Create a function
const Messages = ({messagesData}) => {
  // console.log(messagesData)
  const messagesList = messagesData.map(message => {
    return <Message key={message.id} {...message} />
  })

  return (
    <div>
      {messagesList}
    </div>
  )
}



// 4. export
export default Messages
