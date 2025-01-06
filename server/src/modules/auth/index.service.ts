import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private jwt:JwtService){}

    async login(user:any){
        const payload = {username:user.username}
        return {
            access_token:this.jwt.sign(payload)
        }
    }
}