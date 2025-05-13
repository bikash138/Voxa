import { roomEndpoints } from "@/services/apis"
import { apiConnector } from "@/services/axios"
import { AxiosRequestHeaders } from "axios"
import { toast } from "sonner"


const {
            JOIN_ROOM_API,
            CREATE_ROOM_API
        } = roomEndpoints

//@ts-ignore
export const joinRoom = async (formData, router) => {
    try{
            console.log(formData)
            const toastId = toast.loading("Loading...")
            const token = localStorage.getItem("token")
            const response = await apiConnector("GET", `${JOIN_ROOM_API}/${formData.slug}`, undefined,
                {
                    Authorization: `${token}`
                } as AxiosRequestHeaders
            )
            const roomId = response?.room.id
            if(response?.success){
                console.log(`Room ${formData.slug} with roomId ${roomId} Joined Successfully`)
            }
            toast.dismiss(toastId)
            router.push(`/chat/${roomId}`)
        }
        catch(error){
            console.log("Error while Joining Room")
        }
}

//@ts-ignore
export const createRoom = async (formData, router) => {
    try{
                const toastId = toast.loading("Loading...")
                const token = localStorage.getItem("token")
                const response = await apiConnector("POST", CREATE_ROOM_API, formData,
                    {
                        Authorization: `${token}`
                    } as AxiosRequestHeaders
                )
                if(response?.success){
                    toast.success("Room Created")
                }
                
                toast.dismiss(toastId)
                // router.push("/joinRoom")
            }
            catch(error){
                console.log("Error while Creating Room")
            }
}