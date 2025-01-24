import { Injectable } from "@nestjs/common";
import { CctvRepository } from "./index.repository";
import { HttpClientService } from "src/core/httpClient/index.service";
@Injectable()
export class CctvSerivce{
    constructor(private repository:CctvRepository,private http:HttpClientService){}

    
}