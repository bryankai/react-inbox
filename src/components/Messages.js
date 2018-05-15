import React from 'react'
import Message from './Message.js'

const Messages = ({messagesData, handleSelected, handleStarred}) => {
  const messagesList = messagesData.map(message => {
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

export default Messages
