import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useContext } from "react";
import { LoadingContext } from "@/contexts/Loading";
const baseUrl = "http://localhost:3000"; // 定義你的 baseUrl

// 定義 API 方法返回的泛型


const api = {
    get: async (path: string, config: AxiosRequestConfig = {})=>{
        try {
            const response: AxiosResponse = await axios.get(`${baseUrl}/${path}`, config);
            return response.data;
        } catch (error) {
            console.error("GET request error:", error);
            throw error;
        }
    },
    post: async (
        path: string,
        data: Record<string, unknown> = {},
        config: AxiosRequestConfig = {},
    )=> {
        try {
            const response: AxiosResponse = await axios.post(`${baseUrl}/${path}`, data, config);
            return response.data;
        } catch (error) {
            console.error("POST request error:", error);
            throw error;
        }
    },
    put: async (
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
    },
    delete: async (path: string, config: AxiosRequestConfig = {}) => {
        try {
            const response: AxiosResponse = await axios.delete(`${baseUrl}/${path}`, config);
            return response.data;
        } catch (error) {
            console.error("DELETE request error:", error);
            throw error;
        }
    },
    patch: async (
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
};

export default api;