import { redisClient } from "@repo/redis/redisClient";

let isRunning = true;

export const redisWorker = async () => {
    console.log("Number -> ", process.listenerCount("SIGINT"))
    console.log("Redis Worker has started and is listening for messages..."); // Worker starting log

    while (isRunning) {
        try {
            const result = await redisClient.brpop("ws_message_queue", 0);
            if (result) {
                console.log("Message received:", result);
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
    console.log("Number -> ", process.listenerCount("SIGINT"))
    console.log("Shutting down worker...");
    isRunning = false;
    try {
        await redisClient.quit();
        console.log("Redis connection closed.");
    } catch (error) {
        console.error("Error while closing Redis connection:", error);
    }
    console.log("Exitting the process")
    
});

// Start the worker
console.log("Starting Redis Worker..."); // Log before starting the worker
redisWorker();