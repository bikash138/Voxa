import { LogOut, MoreVertical, Phone, Video } from 'lucide-react'
import React from 'react'

const ChatHeader = ({name}: {name:string}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-900">
      <div className="flex items-center gap-3">
        
        {/* <UserAvatar user={user} /> */}
        <div>
          <h2 className="font-semibold text-gray-300">{name}</h2>
          <p className="text-xs text-gray-400">
            {/* {user.isOnline ? 'Online' : 'Offline'} */}
            Online
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-200 hover:text-blue-500 transition-colors">
          <Phone size={20} />
        </button>
        <button className="text-gray-200 hover:text-blue-500 transition-colors">
          <Video size={20} />
        </button>
        <button className="text-gray-200 hover:text-blue-500 transition-colors">
          <MoreVertical size={20} />
        </button>
        
      </div>
    </div>
  )
}

export default ChatHeader