import { Test, TestingModule } from '@nestjs/testing';
import { ExampleMethodController } from './example-method.controller';

describe('ExampleMethodController', () => {
  let controller: ExampleMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleMethodController],
    }).compile();

    controller = module.get<ExampleMethodController>(ExampleMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
