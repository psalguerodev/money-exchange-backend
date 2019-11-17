import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { HttpModule } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [ExchangeService],
  controllers: [ExchangeController],
})
export class ExchangeModule {}
