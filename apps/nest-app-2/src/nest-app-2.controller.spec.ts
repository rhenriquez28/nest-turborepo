import { Test, TestingModule } from '@nestjs/testing';
import { NestApp2Controller } from './nest-app-2.controller';
import { NestApp2Service } from './nest-app-2.service';

describe('NestApp2Controller', () => {
  let nestApp2Controller: NestApp2Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NestApp2Controller],
      providers: [NestApp2Service],
    }).compile();

    nestApp2Controller = app.get<NestApp2Controller>(NestApp2Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nestApp2Controller.getHello()).toBe('Hello World!');
    });
  });
});
