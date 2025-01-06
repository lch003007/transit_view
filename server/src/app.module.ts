import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VdModule } from './modules/app/vd/index.module';
import { TrafficStatusModule } from './modules/app/trafficStatus/index.module';
import { CctvModule } from './modules/app/cctv/index.module';
import { TravelTimeModule } from './modules/app/travelTime/index.module';
import { AuthModule } from './modules/auth/index.module';

@Module({
  imports: [VdModule,TrafficStatusModule,CctvModule,TravelTimeModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
