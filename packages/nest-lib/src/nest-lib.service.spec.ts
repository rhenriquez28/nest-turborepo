import { Test, TestingModule } from '@nestjs/testing';
import { NestLibService } from './nest-lib.service';

describe('NestLibService', () => {
  let service: NestLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestLibService],
    }).compile();

    service = module.get<NestLibService>(NestLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
