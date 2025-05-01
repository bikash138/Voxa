'use client'
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
const URL = "ws://localhost:8080"


export default function Home() {
  
  const {
    register,
    handleSubmit,
    reset
  } = useForm()
  //@ts-ignore
  const wsRef = useRef()
  const [messages, setMessage] = useState([""])

  //@ts-ignore
  const sendMessage= (data) => {
    //@ts-ignore
    wsRef.current.send(JSON.stringify({
      type: "chat",
      payload: data
    }))
    reset({message: ""})
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
          roomId: "1"
      }
    }))}
    return () => {
      ws.close()
    }
  },[])
  
  //@ts-ignore
  
  
  
  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col">
          {
            messages.map((message)=>(
              <p>{message}</p>
            ))
          }
          <form onSubmit={handleSubmit(sendMessage)}>
            <input {...register("message")} name="message" placeholder="Message"/>
            <button
              className="cursor-pointer bg-orange-500 p-2 rounded-2xl mt-2 text-center">
              Send Message
            </button>
          </form>
        </div>
    </div>
  );
}
