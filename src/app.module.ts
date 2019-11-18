import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ExchangeModule } from './exchange/exchange.module';
import { PipesModule } from './pipes/pipes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ExchangeModule,
    PipesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
