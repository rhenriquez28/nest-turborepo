import { Module } from '@nestjs/common';
import { NestLibService } from './nest-lib.service';

@Module({
  providers: [NestLibService],
  exports: [NestLibService],
})
export class NestLibModule {}
