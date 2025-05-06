'use client'
import ChatHeader from "@/components/ChatPage/ChatHeader";
import MessageBubble from "@/components/ChatPage/MessageBubble";
import NavBar from "@/components/NavBar/NavBar";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
const URL = "ws://localhost:8080"


export default function page() {

  interface formDataType{
    message: string
  }

  const params = useParams()
  const roomId = params.roomId

  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      message: ""
    }
  })
  //@ts-ignore
  const wsRef = useRef<WebSocket | null>()
  const [messages, setMessage] = useState([""])


  const sendMessage= (formData: formDataType) => {
    if(!wsRef.current){
      throw new Error("WsRef Missing")
    }
    wsRef.current.send(JSON.stringify({
      type: "chat",
      payload: formData
    }))

    reset()
  }

  
  useEffect(()=>{
    const ws = new WebSocket(URL)
    ws.onmessage = (a) => {
      setMessage(m => [...m, a.data])
    }
    wsRef.current = ws
    //@ts-ignore
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join-room",
        payload: {
          roomId: roomId
      }
    }))}
    return () => {
      ws.close()
    }
  },[])
  
  //@ts-ignore
  
  
  
  return (
    
        // <div className="bg-black shadow-xl overflow-hidden min-h-screen md:h-screen">
          <div className="min-h-screen min-w-screen bg-gray-900 flex flex-col justify-center" >
            {/* Chat Header */}
            <div className="h-[15%]"><ChatHeader/></div>

          {/* ChatContainer */}
            <div className="flex flex-col h-96 bg-gray-900 shadow-lg overflow-hidden">
                <div 
                // ref={messageContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-2"
                >
                {messages.map((message, index) => (
                    <MessageBubble
                    key={index}
                    //@ts-ignore
                    message={message}
                    // isCurrentUser={message.senderId === currentUser.id}
                    // otherUser={otherUser}
                    />
                ))}
                </div>
            </div>

          {/* Chat Input */}
            <div className="h-[10%]">
                <form 
                onSubmit={handleSubmit(sendMessage)}
                className="flex items-center gap-2 border-t border-gray-200 p-4 bg-gray-900"
            >
                <input
                type="text"
                {...register("message")}
                placeholder="Type a message..."
                className=" text-white flex-1 py-2 px-4 rounded-full border border-gray-500 focus:outline-none focus:ring-8 focus:ring-red-300 focus:border-gray-400 duration-100 transition-all"
                />
                <button>
                <Send size={18} className="text-blue-400"/>
                </button>
            </form>
            </div>
         </div>    
  );
}
