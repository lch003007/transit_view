'use client';
import { useState,createContext,Dispatch,SetStateAction } from "react";

const LayoutContext = createContext<{
    isSidenavHide: boolean;
    setSidenavHide: Dispatch<SetStateAction<boolean>>;
    setHoverSidenav:Dispatch<SetStateAction<boolean>>
  }>({
    isSidenavHide: true,
    setSidenavHide: () => {}, // 默認值為空函數
    setHoverSidenav:()=>{}
  });

function LayoutProvider({children}:any){

    const [sidenavHide,setSidenavHide] = useState<boolean>(true)
    const [hoverSidenav,setHoverSidenav] = useState<boolean>(false)
    return <LayoutContext.Provider
    value={{
        isSidenavHide:sidenavHide&&!hoverSidenav,
        setSidenavHide:setSidenavHide,
        setHoverSidenav:setHoverSidenav
    }}
    >
        {children}
    </LayoutContext.Provider>
}

export {LayoutContext,LayoutProvider}