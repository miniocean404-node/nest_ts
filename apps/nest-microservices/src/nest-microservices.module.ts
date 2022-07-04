import { ExampleModule } from '@app/nest-microservices/module/example/example.module'
import { Module } from '@nestjs/common'
import { NestMicroservicesController } from './nest-microservices.controller'
import { NestMicroservicesService } from './nest-microservices.service'

@Module({
  imports: [ExampleModule],
  controllers: [NestMicroservicesController],
  providers: [NestMicroservicesService],
})
export class NestMicroservicesModule {}
