import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import {redisClient} from "@repo/redis/redisClient"
const JWT_SECRET = 'bikash'

const PORT = 8080
const HOST = '192.168.0.171'
const ws = new WebSocketServer({host: HOST, port: PORT })
console.log(`WS Server is running at PORT: ${HOST}:${PORT}`)

//@ts-ignore
const allSockets = []
const checkUser = (token : string) : string | null => {
    try{
        const decode = jwt.verify(token, JWT_SECRET)
        if(!decode){
            return null
        }
        //@ts-ignore
        return decode.userId
    }catch(error){
        return null
    }
}

ws.on('connection', (socket, req)=>{
    const url = req.url
    if(!url){
        return
    }
    const queryParams = new URLSearchParams(url.split("?")[1])
    const token = queryParams.get('token')
    if(!token){
        return 
    }
    const userId = checkUser(token)
    console.log(userId)
    if(!userId){
        socket.close()
        return
    }

    console.log("User Connected")

    socket.on("message", async (message)=>{
        const parsedMessage = JSON.parse(message as unknown as string)
        if(parsedMessage.type == 'join-room'){
            const roomId = parsedMessage.payload.roomId
            allSockets.push({
                socket,
                room: roomId
            })
        }
        if(parsedMessage.type == 'chat'){
            console.log("User Want to Chat")
            console.log(parsedMessage)
            const queueItem = {
                userId: userId,
                message: parsedMessage.payload.message,
                timestamp: Date.now()
            }
            await redisClient.lpush("ws_message_queue", JSON.stringify(queueItem))
            //@ts-ignore
            const currentUserRoomId = allSockets.find((user) => user.socket === socket)?.room
            //@ts-ignore
            allSockets
            //@ts-ignore
                .filter((user) => user.room === currentUserRoomId)
                //@ts-ignore
                .forEach((user) => user.socket.send(parsedMessage.payload.message))
        
        }
    })
    socket.on('close', ()=>{
        console.log("User Disconnected")
    })
}) 