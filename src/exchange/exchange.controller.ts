import { Controller, Get, HttpStatus, InternalServerErrorException, Logger, Query, Res, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrencyValidationPipe } from '../pipes/currency-validation.pipe';
import { GetMoneyExchangeDto } from './dto/get-money-exchange.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
@ApiUseTags('exchange')
export class ExchangeController {

  private readonly logger = new Logger(ExchangeController.name);

  constructor(private readonly exchangeService: ExchangeService) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'The money exchange obtain successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an error in the service' })
  async getMoneyExchange(
    @Query(ValidationPipe, CurrencyValidationPipe) getExchange: GetMoneyExchangeDto,
    @Res() response: Response) {

    this.logger.verbose(`Request from frontend ${JSON.stringify(getExchange)}`);

    try {
      const ammountResponse = await this.exchangeService.getMoneyExchange(getExchange);
      response.status(HttpStatus.OK).json(ammountResponse);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
