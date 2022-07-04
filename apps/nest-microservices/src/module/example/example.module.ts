import { ExampleMicroserviceBaseController } from '@app/nest-microservices/module/example/example-microservice-base.controller'
import { ExampleController } from '@app/nest-microservices/module/example/example.controller'
import { Module } from '@nestjs/common'

@Module({
  controllers: [ExampleController, ExampleMicroserviceBaseController],
})
export class ExampleModule {}
