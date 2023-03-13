import { Module } from '@nestjs/common';
import { NestApp2Controller } from './nest-app-2.controller';
import { NestApp2Service } from './nest-app-2.service';

@Module({
  imports: [],
  controllers: [NestApp2Controller],
  providers: [NestApp2Service],
})
export class NestApp2Module {}
