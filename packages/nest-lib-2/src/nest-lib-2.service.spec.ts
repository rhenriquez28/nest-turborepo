import { Test, TestingModule } from '@nestjs/testing';
import { NestLib2Service } from './nest-lib-2.service';

describe('NestLib2Service', () => {
  let service: NestLib2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestLib2Service],
    }).compile();

    service = module.get<NestLib2Service>(NestLib2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
