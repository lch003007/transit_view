import { Injectable, OnModuleInit,OnModuleDestroy } from '@nestjs/common';
import { PrismaClient,Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit,OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
        console.log('Connected to database');
      }
    
      // 應用關閉時自動斷開資料庫連接
      async onModuleDestroy() {
        await this.$disconnect();
        console.log('Disconnected from database');
      }
      

      async executeOperation<T extends keyof PrismaClient, M extends keyof PrismaClient[T]>(
        props: any | any[],
        tableName: T,
        method: M
    ) {
        if (Array.isArray(props)) {
            return this.$transaction(
                props.map(item => (this[tableName][method] as Function)(item))
            );
        } else {
            return await (this[tableName][method] as Function)(props)
            
        }
    }

}

export type deviceCreateManyData = Prisma.DeviceCreateInput[]
export type deviceFindManyArgs = Prisma.DeviceFindManyArgs
export type deviceUpdateManyArgs = Prisma.DeviceUpdateManyArgs
export type deviceDeleteManyArgs = Prisma.DeviceDeleteManyArgs

export type roadCreateManyData = Prisma.RoadCreateInput[]
export type roadFindManyArgs = Prisma.RoadFindManyArgs
export type roadUpdateManyArgs = Prisma.RoadUpdateManyArgs
export type roadDeleteManyArgs = Prisma.RoadDeleteManyArgs

export type cctvCreateManyData = Prisma.CctvCreateInput[]
export type cctvFindManyArgs = Prisma.CctvFindManyArgs
export type cctvUpdateManyArgs = Prisma.CctvUpdateManyArgs
export type cctvDeleteManyArgs = Prisma.CctvDeleteManyArgs

export type travelSegmentCreateManyData = Prisma.TravelSegmentCreateInput[]
export type travelSegmentFindManyArgs = Prisma.TravelSegmentFindManyArgs
export type travelSegmentUpdateManyArgs = Prisma.TravelSegmentUpdateManyArgs
export type travelSegmentDeleteManyArgs = Prisma.TravelSegmentDeleteManyArgs

export type trafficCreateManyData = Prisma.TrafficCreateInput[]
export type trafficFindManyArgs = Prisma.TrafficFindManyArgs
export type trafficUpdateManyArgs = Prisma.TrafficUpdateManyArgs
export type trafficDeleteManyArgs = Prisma.TrafficDeleteManyArgs

export type trafficStatusCreateManyData = Prisma.TrafficStatusCreateInput[]
export type trafficStatusFindManyArgs = Prisma.TrafficStatusFindManyArgs
export type trafficStatusUpdateManyArgs = Prisma.TrafficStatusUpdateManyArgs
export type trafficStatusDeleteManyArgs = Prisma.TrafficStatusDeleteManyArgs

export type systemLogCreateManyData = Prisma.SystemLogCreateInput[]
export type systemLogFindManyArgs = Prisma.SystemLogFindManyArgs
export type systemLogUpdateManyArgs = Prisma.SystemLogUpdateManyArgs
export type systemLogDeleteManyArgs = Prisma.SystemLogDeleteManyArgs

export type travelTimeRecordCreateManyData = Prisma.TravelTimeRecordCreateInput[]
export type travelTimeRecordFindManyArgs = Prisma.TravelTimeRecordFindManyArgs
export type travelTimeRecordUpdateManyArgs = Prisma.TravelTimeRecordUpdateManyArgs
export type travelTimeRecordDeleteManyArgs = Prisma.TravelTimeRecordDeleteManyArgs

export type panelCreateManyData = Prisma.PanelCreateInput[]
export type panelFindManyArgs = Prisma.PanelFindManyArgs
export type panelUpdateManyArgs = Prisma.PanelUpdateManyArgs
export type panelDeleteManyArgs = Prisma.PanelDeleteManyArgs

export type userCreateManyData = Prisma.UserCreateInput[]
export type userFindManyArgs = Prisma.UserFindManyArgs
export type userUpdateManyArgs = Prisma.UserUpdateManyArgs
export type userDeleteManyArgs = Prisma.UserDeleteManyArgs

export type panelGroupCreateManyData = Prisma.PanelGroupCreateInput[]
export type panelGroupFindManyArgs = Prisma.PanelGroupFindManyArgs
export type panelGroupUpdateManyArgs = Prisma.PanelGroupUpdateManyArgs
export type panelGroupDeleteManyArgs = Prisma.PanelGroupDeleteManyArgs

export type cctvGroupCreateManyData = Prisma.CctvGroupCreateInput[]
export type cctvGroupFindManyArgs = Prisma.CctvGroupFindManyArgs
export type cctvGroupUpdateManyArgs = Prisma.CctvGroupUpdateManyArgs
export type cctvGroupDeleteManyArgs = Prisma.CctvGroupDeleteManyArgs

export type travelGroupCreateManyData = Prisma.TravelGroupCreateInput[]
export type travelGroupFindManyArgs = Prisma.TravelGroupFindManyArgs
export type travelGroupUpdateManyArgs = Prisma.TravelGroupUpdateManyArgs
export type travelGroupDeleteManyArgs = Prisma.TravelGroupDeleteManyArgs