import { CurrencyType } from './get-money-exchange.dto';
export class GetMonenyResponseDto {
  constructor(
    private currency: CurrencyType,
    private currencyTo: CurrencyType,
    private amountCurrency: string,
    private amountCurrencyTo: string,
  ) {}
}
