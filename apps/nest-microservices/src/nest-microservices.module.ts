import { Module } from '@nestjs/common'
import { NestMicroservicesController } from './nest-microservices.controller'
import { NestMicroservicesService } from './nest-microservices.service'

@Module({
  imports: [],
  controllers: [NestMicroservicesController],
  providers: [NestMicroservicesService],
})
export class NestMicroservicesModule {}
