'use client'
import MessageBubble from "@/components/ChatPage/MessageBubble";
import { LogOut, MoreVertical, Phone, Send, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";


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
  const [messages, setMessage] = useState([])  
  const router = useRouter()
  //@ts-ignore
  const user = useSelector((state: RootState)=>state.user.user)
  
  const sendMessage= (formData: formDataType) => {
    if(!wsRef.current){
      throw new Error("WsRef Missing")
    }
    const message = {
      text: formData.message,
      from: "self"
    }
    wsRef.current.send(JSON.stringify({
      type: "chat",
      payload: formData
    }))
    //@ts-ignore
    setMessage((m) => [...m, message])
    reset()
  }

  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    const URL = `ws://192.168.0.171:8080?token=${token}`; 
    const ws = new WebSocket(URL)
    ws.onmessage = (a) => {
      //@ts-ignore
      setMessage((m) => [...m, {text: a.data, from: "other"}])
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
  
  return (
    
        // <div className="bg-black shadow-xl overflow-hidden min-h-screen md:h-screen">
          <div className="min-h-screen min-w-screen bg-gray-900 flex flex-col justify-center" >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-900">
              <div className="flex items-center gap-3">
              {/* <UserAvatar user={user} /> */}
                <div>
                  <h2 className="font-semibold text-gray-300">{user?.name || "Guest"}</h2>
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
                <button
                  onClick={()=>{
                    wsRef.current?.close()
                    router.push("/dashboard")
                  }}
                  className="cursor-pointer text-gray-200 hover:text-blue-500 transition-colors">
                    <LogOut size={20} />
                </button>
              </div>
            </div>

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
                    message={message.text}
                    //@ts-ignore
                    isCurrentUser={message.from === "self"}
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
                autoComplete="off"
                {...register("message")}
                placeholder="Type a message..."
                className=" text-white flex-1 py-2 px-4 rounded-full border border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 duration-100 transition-all"
                />
                <button className="cursor-pointer">
                  <Send size={18} className="text-blue-400"/>
                </button>
            </form>
            </div>
         </div>    
  );
}
