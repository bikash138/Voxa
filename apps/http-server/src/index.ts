import { prismaClient } from "@repo/db/prismaClient"
import { SignInSchema, SignUpSchema, CreateRoomSchema } from "@repo/common/zodTypes"
import express from 'express'
import cors from "cors"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const JWT_SECRET = 'bikash'
const app = express()
app.use(express.json())
app.use(cors())

app.post("signup", async (req,res)=>{
    try{
        const parsedData = SignUpSchema.safeParse(req.body)
        if(!parsedData.success){
            res.status(415).json({
                message: "Invalid Inputs"
            })
            return
        }
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10)
        await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                password: hashedPassword,
                name: parsedData.data?.name
            }
        })
        res.status(200).json({
            message: "Sign Up Success, User Created Successfully",
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
})

//SIGNIN ROUTE
app.post("signin", async (req,res)=>{
    try{
        const parsedData = SignInSchema.safeParse(req.body)
        if(!parsedData.success){
            res.status(415).json({
                message: "Invalid Inputs"
            })
            return
        }
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data?.email,
            },
            select:{
                password: true,
                id: true
            }
        })
        if(!user){
            res.status(501).json({
                message: "User Not Found",
            })
            return
        }
        const validPassword = await bcrypt.compare(parsedData.data.password, user.password)
        if(!validPassword){
            res.status(411).json({
                message: "Wrong Password"
            })
            return
        }
        if(!JWT_SECRET){
            throw new Error("JWT_SECRET Not Found")
        }
        const token = jwt.sign({
            userId: user?.id
        }, JWT_SECRET)

        res.status(200).json({
            message: "Sign In Success, User Logged In",
            token
        })
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


