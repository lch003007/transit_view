'use client';
import { useState,createContext,Dispatch,SetStateAction, ReactNode } from "react";

const LoadingContext = createContext<{
    isLoading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
  }>({
    isLoading: true,
    setLoading: () => {}, // 默認值為空函數
  });

function LoadingProvider({children}:{children:ReactNode}){

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