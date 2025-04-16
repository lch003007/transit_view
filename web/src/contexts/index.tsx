import { LayoutProvider } from "./LayoutContext";
import { ItemPickerProvider } from "./ItemPickerContext";
import { LoadingProvider } from "./Loading";
import { DialogProvider } from "./DialogContext";
import { ReactNode } from "react";

export default function Contexts({children}:{children:ReactNode}){
    return <LayoutProvider>
        <LoadingProvider>
            <DialogProvider>
        <ItemPickerProvider>
        {children}
        </ItemPickerProvider>
        </DialogProvider>
        </LoadingProvider>
    </LayoutProvider>
}