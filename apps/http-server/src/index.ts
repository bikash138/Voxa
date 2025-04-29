import { client } from "@repo/db/client";
import { SignInSchema, SignUpSchema, CreateRoomSchema } from "@repo/common/zodTypes"
import express from 'express'
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.post("signup", (req,res)=>{
    try{

    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
})

const PORT = process.env.PORT || 4000
app.listen( PORT =>{
    console.log(`Server is up at PORT ${PORT}`)
})


