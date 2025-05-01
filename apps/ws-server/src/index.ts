import { WebSocketServer } from "ws";

const PORT = 8080
const ws = new WebSocketServer({port: PORT})
console.log(`WS Server is running at PORT: ${PORT}`)

//@ts-ignore
const allSockets = []

ws.on('connection', (socket)=>{
    console.log("User Connected")

    socket.on("message", (message)=>{
        const parsedMessage = JSON.parse(message as unknown as string)
        if(parsedMessage.type == 'join-room'){
            const roomId = parsedMessage.payload.roomId
            console.log(parsedMessage)
            allSockets.push({
                socket,
                room: roomId
            })
        }
        if(parsedMessage.type == 'chat'){
            console.log("User Want to Chat")
            console.log(parsedMessage)
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
}) 