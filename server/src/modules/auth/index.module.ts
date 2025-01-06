import { AuthService } from "./index.service";
import { Module } from "@nestjs/common";
import { AuthController } from "./index.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    providers:[AuthService],
    controllers:[AuthController],
    imports:[
        JwtModule.register({
            secret:'transit_view_key',
            signOptions:{expiresIn:'1h'}
        })
    ]
})

export class AuthModule{};

