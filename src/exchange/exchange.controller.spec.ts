import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { HttpModule } from '@nestjs/common';

describe('Exchange Controller', () => {
  let controller: ExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ExchangeController],
      providers: [ExchangeService],
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
