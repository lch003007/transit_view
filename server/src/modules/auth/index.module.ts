import { AuthService } from "./index.service";
import { Module } from "@nestjs/common";
import { AuthController } from "./index.controller";
import { JwtModule } from "@nestjs/jwt";
import { userRepository } from "./index.repository";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    providers:[AuthService,userRepository],
    controllers:[AuthController],
    imports:[
        JwtModule.register({
            secret:'transit_view_key',
            signOptions:{expiresIn:'1h'}
        }),
        PrismaModule
    ]
})

export class AuthModule{};

