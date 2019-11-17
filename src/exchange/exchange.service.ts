import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class ExchangeService {

  constructor(private readonly http: HttpService) {}

}
