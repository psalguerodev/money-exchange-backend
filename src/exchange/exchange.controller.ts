import { Controller, Res, HttpStatus, Query, ValidationPipe, Get, Logger } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { Response } from 'express';
import { ApiUseTags } from '@nestjs/swagger';
import { GetMoneyExchangeDto } from './dto/get-money-exchange.dto';

@Controller('exchange')
@ApiUseTags('exchange')
export class ExchangeController {

  private readonly logger = new Logger(ExchangeController.name);

  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  getMoneyExchange(
    @Query(ValidationPipe) getExchange: GetMoneyExchangeDto,
    @Res() response: Response) {
    response.status(HttpStatus.OK).send(getExchange);
  }
}
