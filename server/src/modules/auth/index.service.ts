import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { userRepository } from "./index.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{
    private asccessTokens:any[] = []
    constructor(private jwt:JwtService,private repository:userRepository){}

    async login(user: any) {
        const payload = { username: user.username };
        const accessToken = this.jwt.sign(payload);
    
        // 從資料庫取得用戶
        const result = await this.repository.getUser({ where: { username: user.username } });
        const correctPassword = result[0]?.password;
    
        // 檢查用戶是否存在
        if (!correctPassword) {
            return {
                success:false,
                message: '帳號不存在',
            };
        }
    
        // 檢查密碼是否正確
        const isPasswordCorrect = await bcrypt.compare(user.password, correctPassword);
        // const isPasswordCorrect =user.password==correctPassword
        if (!isPasswordCorrect) {
            return {
                success:false,
                message: '密碼錯誤',
            };
        }
    
        // 儲存存取權杖
        this.asccessTokens.push({ username: user.username, accessToken: accessToken });
        // 成功回應
        return {
            success:true,
            access_token: accessToken,
            auth:result[0].auth.split(',')
        };
    }
    

    async register(props:any){
        props['password'] = await bcrypt.hash(props['password'],10)
        return await this.repository.insertUser(props)
    }

    async updateData(props:any){
        if(props['data']['password']){
            props['data']['password'] = await bcrypt.hash(props['data']['password'],10)
        }
        return await this.repository.updateUser(props)
    }
}