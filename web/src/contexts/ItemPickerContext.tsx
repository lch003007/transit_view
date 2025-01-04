'use client';
import { useState,createContext,Dispatch,SetStateAction } from "react";

type itemsSelected = Record<string, any>;

const ItemPickerContext = createContext<{
    itemLength:number;
    setItemLength:Dispatch<SetStateAction<number>>;
    itemsSelected:any
    setItemsSelected:Dispatch<SetStateAction<itemsSelected>>
  }>({
    itemLength:1,
    setItemLength:() => {},
    itemsSelected:{},
    setItemsSelected:()=>{}
  });

function ItemPickerProvider({children}:any){
    const [itemLength,setItemLength] = useState(1)
    const [itemsSelected,setItemsSelected] = useState<itemsSelected>({})

    return <ItemPickerContext.Provider
    value={{
        itemLength,
        setItemLength,
        itemsSelected,
        setItemsSelected
    }}
    >
        {children}
    </ItemPickerContext.Provider>
}

export {ItemPickerContext,ItemPickerProvider}
