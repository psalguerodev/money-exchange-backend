import { Injectable, HttpService, Logger } from '@nestjs/common';
import { map, timeout, catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { GetMoneyExchangeDto } from './dto/get-money-exchange.dto';

@Injectable()
export class ExchangeService {

  private readonly logger = new Logger(ExchangeService.name);

  private readonly API_KEY = 'd8f6938c3d492ea0d097';
  private readonly TIMEOUT_API = 4000;
  private condition = 'USD_EUR';
  private readonly exchangeApi =
    `https://free.currconv.com/api/v7/convert?q=${this.condition}&compact=ultra&apiKey=${this.API_KEY}`;

  constructor(private readonly http: HttpService) {}

  getMoneyExchange(getExchangeDto: GetMoneyExchangeDto): Observable<object> {
    this.logger.verbose(`Send request to url ${this.exchangeApi}`);
    return this.http.get(this.exchangeApi)
      .pipe(
        timeout(this.TIMEOUT_API),
        retry(2),
        map(response => response.data),
        catchError(error => throwError(error)));
  }

}
