import { CacheModule, Module } from '@nestjs/common'

import { ExampleController } from './example.controller'
import { ExampleService } from './example.service'

const exampleProvide = {
  provide: 'InjectName',
  useValue: { a: 1 },
}

// @Global()
@Module({
  imports: [CacheModule.register()],
  controllers: [ExampleController],
  providers: [ExampleService, exampleProvide],
})
export class ExampleModule {}
