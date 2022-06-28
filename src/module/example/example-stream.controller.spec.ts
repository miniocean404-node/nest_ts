import { Test, TestingModule } from '@nestjs/testing';
import { ExampleStreamController } from './example-stream.controller';

describe('ExampleStreamController', () => {
  let controller: ExampleStreamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleStreamController],
    }).compile();

    controller = module.get<ExampleStreamController>(ExampleStreamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
