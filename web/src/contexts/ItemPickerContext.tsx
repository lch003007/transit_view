'use client';
import { useState,createContext,Dispatch,SetStateAction, ReactNode } from "react";

type itemsSelected = Record<string, any>;

const ItemPickerContext = createContext<{
    itemLength:number;
    setItemLength:Dispatch<SetStateAction<number>>;
    itemsSelected:any
    setItemsSelected:Dispatch<SetStateAction<itemsSelected>>
    group:number,
    setGroup:Dispatch<SetStateAction<number>>
  }>({
    itemLength:1,
    setItemLength:() => {},
    itemsSelected:{},
    setItemsSelected:()=>{},
    group:0,
    setGroup:()=>{}
  });

function ItemPickerProvider({children}:{children:ReactNode}){
    const [itemLength,setItemLength] = useState(1)
    const [itemsSelected,setItemsSelected] = useState<itemsSelected>({})
    const [group,setGroup] = useState(0)
    console.log(itemsSelected)
    return <ItemPickerContext.Provider
    value={{
        itemLength,
        setItemLength,
        itemsSelected,
        setItemsSelected,
        group,
        setGroup
    }}
    >
        {children}
    </ItemPickerContext.Provider>
}

export {ItemPickerContext,ItemPickerProvider}
