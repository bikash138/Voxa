'use client'
import { useEffect, useMemo, useRef, useState } from "react";
const URL = "ws://localhost:8080"


export default function Home() {
  
  //@ts-ignore
  const wsRef = useRef()
  const [message, setMessage] = useState('')


  const sendMessage= () => {
    //@ts-ignore
    wsRef.current.send(message)
    setMessage('')
  }
  
  useEffect(()=>{
    const ws = new WebSocket(URL)
    wsRef.current = ws
  },[])
  
  //@ts-ignore
  
  
  
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col">
          
          <input value={message}  onChange={e => setMessage(e.target.value)} placeholder="Message"/>
          <button onClick={sendMessage}
            className="cursor-pointer bg-orange-500 p-2 rounded-2xl mt-2 text-center">
            Send Message
          </button>
          
        </div>
    </div>
  );
}
