'use client';
import { useState,createContext,Dispatch,SetStateAction } from "react";

const LoadingContext = createContext<{
    isLoading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  }>({
    isLoading: true,
    setLoading: () => {}, // 默認值為空函數
  });

function LoadingProvider({children}:any){

    const [isLoading,setLoading] = useState<boolean>(false)
    return <LoadingContext.Provider
    value={{
        isLoading:isLoading,
        setLoading:setLoading,
    }}
    >
        {children}
    </LoadingContext.Provider>
}

export {LoadingContext,LoadingProvider}