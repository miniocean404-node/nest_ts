import { Test, TestingModule } from '@nestjs/testing';
import { ExampleRouteController } from './example-route.controller';

describe('ExampleRouteController', () => {
  let controller: ExampleRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleRouteController],
    }).compile();

    controller = module.get<ExampleRouteController>(ExampleRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
