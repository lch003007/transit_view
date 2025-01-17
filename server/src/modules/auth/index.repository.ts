import { Injectable } from "@nestjs/common";

import { PrismaService, userCreateManyData, userDeleteManyArgs, userFindManyArgs, userUpdateManyArgs } from "../prisma/prisma.service";

@Injectable()
export class userRepository{
    constructor(private prisma:PrismaService){}
    async getUser(props:userFindManyArgs={}){
        return this.prisma.executeOperation(props,'user','findMany')
    }
    
    async insertUser(data:userCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'user','createMany')
    }

    async updateUser(props:userUpdateManyArgs){
        return this.prisma.executeOperation(props,'user','updateMany')
    }

    async deleteUser(props:userDeleteManyArgs){
        return this.prisma.executeOperation(props,'user','deleteMany')
    }
}