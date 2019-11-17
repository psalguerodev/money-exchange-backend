import { Controller, Res, HttpStatus, Query, ValidationPipe, Get, Logger } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { Response } from 'express';
import { ApiUseTags } from '@nestjs/swagger';
import { GetMoneyExchangeDto } from './dto/get-money-exchange.dto';
import { CurrencyValidationPipe } from '../pipes/currency-validation.pipe';

@Controller('exchange')
@ApiUseTags('exchange')
export class ExchangeController {

  private readonly logger = new Logger(ExchangeController.name);

  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  getMoneyExchange(
    @Query(ValidationPipe, CurrencyValidationPipe) getExchange: GetMoneyExchangeDto,
    @Res() response: Response) {
    this.logger.verbose(`Request from frontend ${JSON.stringify(getExchange)}`);
    this.exchangeService.getMoneyExchange(getExchange)
      .subscribe(data => response.status(HttpStatus.OK).json(data));
  }
}
