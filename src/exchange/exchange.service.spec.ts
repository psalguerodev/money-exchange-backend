import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';
import { HttpService, HttpModule } from '@nestjs/common';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
