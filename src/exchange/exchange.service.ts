import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as config from 'config';
import { throwError } from 'rxjs';
import { catchError, map, retry, timeout } from 'rxjs/operators';
import { calculateAmountExchange } from '../utils/calculator.util';
import { formatString } from '../utils/formater.util';
import { GetMoneyExchangeDto } from './dto/get-money-exchange.dto';
import { GetMonenyResponseDto } from './dto/get-money-response.dto';

export interface ExchangeConfig {
  url: string;
  retry: number;
  default_condition: string;
  token: string;
  timeout: number;
  precision: number;
}

@Injectable()
export class ExchangeService {
  private readonly exchangeConfig: ExchangeConfig = config.get('apis.exchange');

  constructor(private readonly http: HttpService) { }

  async getMoneyExchange(getExchangeDto: GetMoneyExchangeDto): Promise<GetMonenyResponseDto> {
    const condition = `${getExchangeDto.currency}_${getExchangeDto.currencyTo}`;
    const url = formatString(this.exchangeConfig.url, condition, this.exchangeConfig.token);

    return this.http.get(url)
      .pipe(
        timeout(this.exchangeConfig.timeout),
        retry(this.exchangeConfig.retry),
        map(response => response.data),
        map(data => calculateAmountExchange(data[condition], getExchangeDto.amount, this.exchangeConfig.precision)),
        map(ammountTo =>
          new GetMonenyResponseDto(getExchangeDto.currency, getExchangeDto.currencyTo, `${getExchangeDto.amount}`, ammountTo)),
        catchError((error) => throwError(error.message)))
      .toPromise()
      .catch(error => { throw new InternalServerErrorException(error.meesage); });
  }

}
