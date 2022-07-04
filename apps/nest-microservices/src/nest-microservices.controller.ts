import { Controller, Get } from '@nestjs/common';
import { NestMicroservicesService } from './nest-microservices.service';

@Controller()
export class NestMicroservicesController {
  constructor(private readonly nestMicroservicesService: NestMicroservicesService) {}

  @Get()
  getHello(): string {
    return this.nestMicroservicesService.getHello();
  }
}
