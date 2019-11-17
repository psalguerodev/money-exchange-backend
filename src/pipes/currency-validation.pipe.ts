import { ArgumentMetadata, Injectable, PipeTransform, Logger, BadRequestException } from '@nestjs/common';
import { GetMoneyExchangeDto } from '../exchange/dto/get-money-exchange.dto';

@Injectable()
export class CurrencyValidationPipe implements PipeTransform {

  transform(value: GetMoneyExchangeDto, metadata: ArgumentMetadata) {
    if (value.currency === value.currencyTo) {
      throw new BadRequestException('The coins cannot be the same');
    }

    return value;
  }
}
