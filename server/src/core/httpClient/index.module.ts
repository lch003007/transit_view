import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { HttpClientService } from "./index.service";
import { sec } from "src/app.setting";

@Module({
    imports:[HttpModule.register({timeout:sec*30,maxRedirects:5})],
    providers:[HttpClientService],
    exports:[HttpClientService]
})
export class HttpClientModule{}