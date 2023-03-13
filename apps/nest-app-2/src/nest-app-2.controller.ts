import { Controller, Get } from '@nestjs/common';
import { NestApp2Service } from './nest-app-2.service';

@Controller()
export class NestApp2Controller {
  constructor(private readonly nestApp2Service: NestApp2Service) {}

  @Get()
  getHello(): string {
    return this.nestApp2Service.getHello();
  }
}
