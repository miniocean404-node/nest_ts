import { Test, TestingModule } from '@nestjs/testing';
import { ExampleScheduleService } from './example-schedule.service';

describe('ExampleScheduleService', () => {
  let service: ExampleScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExampleScheduleService],
    }).compile();

    service = module.get<ExampleScheduleService>(ExampleScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
