import { prismaClient } from "@repo/db/prismaClient"
import { SignInSchema, SignUpSchema, CreateRoomSchema } from "@repo/common/zodTypes"
import express from 'express'
import cors from "cors"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import middleware from "./middleware"
const JWT_SECRET = 'bikash'

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.send("HI THERE")
})

//SIGNUP ROUTE
app.post("/signup", async (req,res)=>{
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
app.post("/signin", async (req,res)=>{
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
                id: true,
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
            userId: user?.id,
        }, JWT_SECRET, {expiresIn: "48h"})

        res.status(200).json({
            message: "Sign In Success, User Logged In",
            token,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error,
        })
    }
})

//CREATE ROOM ROUTE
app.post("/createRoom", middleware, async (req,res)=>{
    try{
        const parsedData = CreateRoomSchema.safeParse(req.body)
        if(!parsedData.success){
            res.status(415).json({
                message: "Invalid Inputs"
            }) 
            return
        } 
        //@ts-ignore
        const userId = req.userId
        const room = await prismaClient.room.create({
            data:{
                slug: parsedData.data?.slug,
                adminId: userId
            }
        })
        res.status(200).json({
            success: true,
            message: "Room Created Successfully",
            room
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
})

//JOIN ROOM ROUTE
app.get("/joinRoom/:slug", middleware, async (req,res)=>{
    try{
        const slug = req.params.slug
        const room = await prismaClient.room.findFirst({
            where:{
                slug: slug,
            }
        })
        res.status(200).json({
            success: true,
            message: "Room Joined Successfully",
            room
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
})

//GET USER DETAILS ROUTE
app.get("/userDetails", middleware, async (req,res)=>{
    try{
        //@ts-ignore
        const userId = req?.userId
        if(!userId){
            throw new Error("User is not authenticated")
        }
        const userDetails = await prismaClient.user.findFirst({
            where:{
                id: userId
            },
            select:{
                email: true,
                name: true,
                photo: true,
                rooms: true,
                chats: true
            }
        })
        res.status(200).json({
            message: "User fetched successfully",
            userDetails
        })
    }catch(error){

    }
})

app.get("/getAllUserRooms", middleware, async (req,res)=>{
    try{
        //@ts-ignore
        const userId = req?.userId
        if(!userId){
            throw new Error ("User unauthenticated")
            return
        }
        const userRooms = await prismaClient.room.findMany({
            where:{
                adminId: userId
            }
        })
        res.status(200).json({
            message: "All User Rooms Fetched",
            userRooms
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

const PORT = process.env.PORT || 4000
app.listen(4000, '0.0.0.0', ()=>{
    console.log(`Server is up at PORT ${PORT}`)
})



