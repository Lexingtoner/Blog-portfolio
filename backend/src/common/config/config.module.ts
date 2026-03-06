import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';
import authConfig from './configs/auth.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
      envFilePath: ['.env', './backend/.env'],
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
