import { MessageSquareMore } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className="flex-1 hidden md:flex bg-gray-950 justify-center items-center h-full">
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                <MessageSquareMore size={40} className="text-purple-500" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No Room Selected</h3>
            <p className="text-gray-400 mb-6 max-w-md">
                Select a room from the list or create a new one to start chatting with your team.
            </p>
            </div>
        </div>
  )
}

export default page