import { redisClient } from "@repo/redis/redisClient";
import {prismaClient} from "@repo/db/prismaClient"

let isRunning = true;

export const redisWorker = async () => {
    
    console.log("Redis Worker has started and is listening for messages..."); // Worker starting log

    while (isRunning) {
        try {
            const result = await redisClient.brpop("messages", 0);
            
            if (result) {
            
                const object  = JSON.parse(result[1])
                const {userId, message, roomId} = object
                console.log("UserId -> ", userId )
                console.log("Message -> ", message )
                console.log("RoomId -> ", roomId )

                await prismaClient.chat.create({
                    data:{
                        userId: userId,
                        message: message,
                        roomId: Number(roomId)
                    }
                })
                
                console.log("Message received:", object);
            } else {
                console.log("No message received.");
            }
        } catch (error) {
            console.log("Error while processing message:", error);
        }
    }
};

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down worker...");
    isRunning = false;
    try {
        await redisClient.quit();
        console.log("Redis connection closed.");
    } catch (error) {
        console.error("Error while closing Redis connection:", error);
    }
    console.log("Exitting the process")
    process.exit(0)
});

// Start the worker
console.log("Starting Redis Worker..."); // Log before starting the worker
redisWorker();