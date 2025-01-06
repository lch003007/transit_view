import { Body, Controller, Post } from "@nestjs/common";
import { JsonWebKey } from "crypto";
import { AuthService } from "./index.service";

@Controller('auth')
export class AuthController{
    constructor(private service:AuthService){}

    @Post('login')
    async login(@Body() props:any) {
        const {username,password} = props
        if(username=='admin'&&password=='admin'){
            return this.service.login(props)
        }
        else
            return {error:'fail to login'}
            
    }
}