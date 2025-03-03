'use client';
import { useState,createContext,Dispatch,SetStateAction, ReactNode } from "react";

const LayoutContext = createContext<{
    isSidenavHide: boolean;
    flash:boolean;
    setSidenavHide: Dispatch<SetStateAction<boolean>>;
    setHoverSidenav:Dispatch<SetStateAction<boolean>>,
    setFlash:Dispatch<SetStateAction<boolean>>
  }>({
    isSidenavHide: true,
    flash:false,
    setSidenavHide: () => {}, // 默認值為空函數
    setHoverSidenav:()=>{},
    setFlash:()=>{}
  });

function LayoutProvider({children}:{children:ReactNode}){

    const [sidenavHide,setSidenavHide] = useState<boolean>(true)
    const [hoverSidenav,setHoverSidenav] = useState<boolean>(false)
    const [flash,setFlash] = useState<boolean>(false)
    return <LayoutContext.Provider
    value={{
        isSidenavHide:sidenavHide&&!hoverSidenav,
        setSidenavHide:setSidenavHide,
        setHoverSidenav:setHoverSidenav,
        setFlash,
        flash
    }}
    >
        {children}
    </LayoutContext.Provider>
}

export {LayoutContext,LayoutProvider}