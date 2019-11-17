import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ExchangeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
