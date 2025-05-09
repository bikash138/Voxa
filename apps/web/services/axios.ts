import axios, { Method, AxiosRequestHeaders } from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async (
    method: Method, 
    url: string, 
    bodyData?: object, // Type for bodyData
    headers?: AxiosRequestHeaders, // Type for headers
    params?: Record<string, any>// Type for params
) => {
    try{
        const response = await axiosInstance({
            method,
            url,
            data: bodyData,
            headers: headers,
            params: params,
        });
        return response.data
    }catch(error : any){
        console.error("API Error", error.response?.data)
        throw error
    }
};