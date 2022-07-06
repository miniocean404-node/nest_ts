import { CacheModule, Module } from '@nestjs/common'

import { HttpModule } from '@nestjs/axios'
import { BullModule } from '@nestjs/bull'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ExampleAxiosService } from './example-axios.service'
import { ExampleCacheController } from './example-cache.controller'
import { ExampleCookieController } from './example-cookie.controller'
import { ExampleCsrfController } from './example-csrf.controller'
import { ExampleEmailController } from './example-email.controller'
import { ExampleEmailService } from './example-email.service'
import { ExampleEventController } from './example-event.controller'
import { ExampleLoggerController } from './example-logger.controller'
import { ExampleMethodController } from './example-method.controller'
import { ExampleMicroserviceBaseClientController } from './example-microservice-base-client.controller'
import { ExampleQueueController } from './example-queue.controller'
import { ExampleQueueService } from './example-queue.service'
import { ExampleRouteController } from './example-route.controller'
import { ExampleScheduleController } from './example-schedule.controller'
import { ExampleScheduleService } from './example-schedule.service'
import { ExampleSerializationController } from './example-serialization.controller'
import { ExampleSessionController } from './example-session.controller'
import { ExampleSseController } from './example-sse.controller'
import { ExampleStreamController } from './example-stream.controller'
import { ExampleVersionController } from './example-version.controller'
import { ExampleWebsoketGateway } from './example-websoket.gateway'
import { ExampleController } from './example.controller'
import { ExampleService } from './example.service'

const exampleProvide = {
  provide: 'InjectName',
  useValue: { a: 1 },
}

// @Global()
@Module({
  imports: [
    CacheModule.register(),
    HttpModule,
    // Redis 连接
    BullModule.registerQueueAsync({
      name: 'queue',
      // configKey: 'example-queue', // 命名配置 搭配 BullModule.forRoot('example-queue', {})
    }),
    ClientsModule.register([
      {
        name: 'NEST_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 4000,
        },
      },
    ]),
  ],
  controllers: [
    ExampleController,
    ExampleCacheController,
    ExampleRouteController,
    ExampleMethodController,
    ExampleSerializationController,
    ExampleVersionController,
    ExampleScheduleController,
    ExampleCookieController,
    ExampleEventController,
    ExampleStreamController,
    ExampleSseController,
    ExampleSessionController,
    ExampleQueueController,
    ExampleEmailController,
    ExampleLoggerController,
    ExampleCsrfController,
    ExampleMicroserviceBaseClientController,
  ],
  providers: [
    ExampleService,
    exampleProvide,
    ExampleScheduleService,
    ExampleAxiosService,
    ExampleQueueService,
    ExampleEmailService,
    ExampleWebsoketGateway,
  ],
})
export class ExampleModule {}
