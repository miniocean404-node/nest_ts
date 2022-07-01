import { CacheModule, Module } from '@nestjs/common'

import { HttpModule } from '@nestjs/axios'
import { ExampleAxiosService } from './example-axios.service'
import { ExampleCacheController } from './example-cache.controller'
import { ExampleCookieController } from './example-cookie.controller'
import { ExampleEventController } from './example-event.controller'
import { ExampleMethodController } from './example-method.controller'
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
import { ExampleQueueService } from './example-queue.service';

const exampleProvide = {
  provide: 'InjectName',
  useValue: { a: 1 },
}

// @Global()
@Module({
  imports: [CacheModule.register(), HttpModule],
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
  ],
  providers: [ExampleService, exampleProvide, ExampleScheduleService, ExampleAxiosService, ExampleQueueService],
})
export class ExampleModule {}
