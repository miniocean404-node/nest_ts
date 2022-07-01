import { CacheModule, Module } from '@nestjs/common'

import { HttpModule } from '@nestjs/axios'
import { BullModule } from '@nestjs/bull'
import { ExampleAxiosService } from './example-axios.service'
import { ExampleCacheController } from './example-cache.controller'
import { ExampleCookieController } from './example-cookie.controller'
import { ExampleEventController } from './example-event.controller'
import { ExampleMethodController } from './example-method.controller'
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
    BullModule.registerQueue({
      name: 'queue',
      configKey: 'example-queue',
    }),
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
  ],
  providers: [ExampleService, exampleProvide, ExampleScheduleService, ExampleAxiosService, ExampleQueueService],
})
export class ExampleModule {}
