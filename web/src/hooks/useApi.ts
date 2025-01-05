import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useContext } from "react";
import { LoadingContext } from "@/contexts/Loading";

function useApi(){
    const {setLoading} = useContext(LoadingContext)
    const baseUrl = "http://localhost:3000"; // 定義你的 baseUrl
    const get = async (path: string, config: AxiosRequestConfig = {})=>{
        try {
            const response: AxiosResponse = await axios.get(`${baseUrl}/${path}`, config);
            return response.data;
        } catch (error) {
            console.error("GET request error:", error);
            throw error;
        }
    }
    
    const post= async (
        path: string,
        data: Record<string, unknown> = {},
        config: AxiosRequestConfig = {},
    )=> {
        try {
            setLoading(true)
            const response: AxiosResponse = await axios.post(`${baseUrl}/${path}`, data, config);
            setLoading(false)
            return response.data;
        } catch (error) {
            console.error("POST request error:", error);
            throw error;
        }
    }
    const put= async (
        path: string,
        data: Record<string, unknown> = {},
        config: AxiosRequestConfig = {}
    ) => {
        try {
            const response: AxiosResponse = await axios.put(`${baseUrl}/${path}`, data, config);
            return response.data;
        } catch (error) {
            console.error("PUT request error:", error);
            throw error;
        }
    }

    const patch = async (
        path: string,
        data: Record<string, unknown> = {},
        config: AxiosRequestConfig = {}
    )=> {
        try {
            const response: AxiosResponse = await axios.patch(`${baseUrl}/${path}`, data, config);
            return response.data;
        } catch (error) {
            console.error("PATCH request error:", error);
            throw error;
        }
    }

    return {get,patch,post,put}
}

export default useApi;