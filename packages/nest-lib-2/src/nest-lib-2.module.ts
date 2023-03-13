import { Module } from '@nestjs/common';
import { NestLib2Service } from './nest-lib-2.service';

@Module({
  providers: [NestLib2Service],
  exports: [NestLib2Service],
})
export class NestLib2Module {}
