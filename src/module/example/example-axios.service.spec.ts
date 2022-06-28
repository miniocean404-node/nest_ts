import { Test, TestingModule } from '@nestjs/testing';
import { ExampleAxiosService } from './example-axios.service';

describe('ExampleAxiosService', () => {
  let service: ExampleAxiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleAxiosService],
    }).compile();

    service = module.get<ExampleAxiosService>(ExampleAxiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
