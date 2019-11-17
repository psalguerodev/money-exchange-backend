import { ApiModelProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, Matches, IsNumber, IsDecimal } from 'class-validator';

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  PEN = 'PEN',
  ARG = 'ARG',
}

export class GetMoneyExchangeDto {

  @IsNotEmpty()
  @IsIn([CurrencyType.EUR, CurrencyType.USD, CurrencyType.PEN, CurrencyType.ARG])
  @ApiModelProperty({ enum: [CurrencyType.EUR, CurrencyType.USD] })
  currency: CurrencyType;

  @IsNotEmpty()
  @IsIn([CurrencyType.EUR, CurrencyType.USD, CurrencyType.PEN, CurrencyType.ARG])
  @ApiModelProperty({ enum: [CurrencyType.EUR, CurrencyType.USD] })
  currencyTo: CurrencyType;

  @IsNotEmpty()
  @IsDecimal()
  @Matches( /^(\d+(\.\d{0,4})?|\.?\d{1,4})$/ , { message:  `The amount format is wrong, max 4 decimals.`})
  @ApiModelProperty()
  amount: number;
}
