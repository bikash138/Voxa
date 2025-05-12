import React from 'react'

const MessageBubble = ({message, isCurrentUser}:{message:any, isCurrentUser:any}) => {
  return (

     <div 
      className={`flex gap-2 mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      {/* {!isCurrentUser && <UserAvatar user={otherUser} size="sm" />} */}
      
        <div 
         className="
         max-w-[80%] rounded-bl-2xl bg-blue-400 text-gray-800 rounded-t-2xl rounded-br-2xl px-4 py-2 shadow-sm"
        >
            <p className="text-sm sm:text-base">{message}</p>
            <div className={`flex items-center gap-1 text-xs mt-1 text-red-50`}>
            {/* <span>{formatTime(message.timestamp)}</span> */}
            
            {/* {isCurrentUser && (
                <span className={`ml-1 ${message.status === 'read' ? 'text-blue-200' : 'text-blue-300'}`}>
                <CheckCheck size={14} />
                </span>
            )} */}
            </div>
      </div>
    </div>

)
}

export default MessageBubble