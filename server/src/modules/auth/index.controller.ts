import { Body, Controller, Post } from "@nestjs/common";
import { JsonWebKey } from "crypto";
import { AuthService } from "./index.service";
import * as bcrypt from 'bcrypt';
import { userRepository } from "./index.repository";

@Controller('auth')
export class AuthController{
    constructor(private service:AuthService,private repository:userRepository){}

    @Post('login')
    async login(@Body() props:any) {
        return await this.service.login(props) 
    }


    @Post('insert')
    async register(@Body() props:any){
        console.log(props)
        return await this.service.register(props)
    }

    @Post('update')
    async updatePassword(@Body() props:any){
        console.log(props)
        return await this.service.updateData(props)
    }

    @Post()
    async getUser(@Body() props:any){
        return await this.repository.getUser(props)
    }
}
