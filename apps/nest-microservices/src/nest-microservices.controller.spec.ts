import { Test, TestingModule } from '@nestjs/testing';
import { NestMicroservicesController } from './nest-microservices.controller';
import { NestMicroservicesService } from './nest-microservices.service';

describe('NestMicroservicesController', () => {
  let nestMicroservicesController: NestMicroservicesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NestMicroservicesController],
      providers: [NestMicroservicesService],
    }).compile();

    nestMicroservicesController = app.get<NestMicroservicesController>(NestMicroservicesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nestMicroservicesController.getHello()).toBe('Hello World!');
    });
  });
});
