import { WebSocketServer } from "ws";

const PORT = 8080
const ws = new WebSocketServer({port: PORT})
console.log(`WS Server is running at PORT: ${PORT}`)

ws.on('connection', (socket)=>{
    console.log("User Connected")

    socket.on("message", (message)=>{
        console.log(message.toString())
    })
})