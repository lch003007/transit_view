import { LayoutProvider } from "./LayoutContext";
import { ItemPickerProvider } from "./ItemPickerContext";
import { LoadingProvider } from "./Loading";
import { DialogProvider } from "./DialogContext";

export default function Contexts({children}:any){
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