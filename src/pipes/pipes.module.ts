import { Module } from '@nestjs/common';
import { CurrencyValidationPipe } from './currency-validation.pipe';

@Module({
  providers: [CurrencyValidationPipe],
  exports: [CurrencyValidationPipe],
})
export class PipesModule {}
