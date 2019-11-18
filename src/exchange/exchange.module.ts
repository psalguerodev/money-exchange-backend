import { CacheInterceptor, CacheModule, HttpModule, Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({ ttl: 600, max: 200 }), // TODO Configuration file - 10 minutes
  ],
  providers: [
    ExchangeService,
    CacheInterceptor,
  ],
  controllers: [ExchangeController],
})
export class ExchangeModule { }
