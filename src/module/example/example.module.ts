import { CacheModule, Module } from '@nestjs/common'

import { ExampleCacheController } from './example-cache.controller'
import { ExampleMethodController } from './example-method.controller'
import { ExampleRouteController } from './example-route.controller'
import { ExampleScheduleController } from './example-schedule.controller'
import { ExampleScheduleService } from './example-schedule.service'
import { ExampleSerializationController } from './example-serialization.controller'
import { ExampleVersionController } from './example-version.controller'
import { ExampleController } from './example.controller'
import { ExampleService } from './example.service'

const exampleProvide = {
  provide: 'InjectName',
  useValue: { a: 1 },
}

// @Global()
@Module({
  imports: [CacheModule.register()],
  controllers: [
    ExampleController,
    ExampleCacheController,
    ExampleRouteController,
    ExampleMethodController,
    ExampleSerializationController,
    ExampleVersionController,
    ExampleScheduleController,
  ],
  providers: [ExampleService, exampleProvide, ExampleScheduleService],
})
export class ExampleModule {}
