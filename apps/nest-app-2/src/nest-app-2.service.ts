import { Injectable } from '@nestjs/common';

@Injectable()
export class NestApp2Service {
  getHello(): string {
    return 'Hello World!';
  }
}
