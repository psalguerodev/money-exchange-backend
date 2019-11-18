import {
  CacheInterceptor,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CurrencyValidationPipe } from '../pipes/currency-validation.pipe';
import { GetMoneyExchangeDto } from './dto/get-money-exchange.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
@ApiUseTags('exchange')
export class ExchangeController {

  private readonly logger = new Logger(ExchangeController.name);

  constructor(
    private readonly exchangeService: ExchangeService) { }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'The money exchange obtain successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'There is an error in the service' })
  @UseInterceptors(CacheInterceptor)
  async getMoneyExchange(
    @Query(ValidationPipe, CurrencyValidationPipe) getExchange: GetMoneyExchangeDto) {
    this.logger.verbose(`Request from frontend ${JSON.stringify(getExchange)}`);
    return await this.exchangeService.getMoneyExchange(getExchange);
  }

}
