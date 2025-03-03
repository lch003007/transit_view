import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

function useApi(){

    const baseUrl = `http://${window.location.hostname}:2500`; // 定義你的 baseUrl
    const get = async (path: string, config: AxiosRequestConfig = {})=>{
        try {
            const response: AxiosResponse = await axios.get(`${baseUrl}/${path}`, config);
            return response.data;
        } catch (error) {
            console.error("GET request error:", error);
            throw error;
        }
    }
    

    const post= async <T = Record<string, unknown>>(
        path: string,
        data?: T,
        config: AxiosRequestConfig = {},
    )=> {
        try {
            const response: AxiosResponse = await axios.post(`${baseUrl}/${path}`, data, config);
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