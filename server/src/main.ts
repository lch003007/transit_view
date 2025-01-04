import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api')
  app.enableCors({
    origin: '*', // 設置為 '*' 表示允許任何來源
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

