import { Test, TestingModule } from '@nestjs/testing'
import { ExampleCacheController } from './example-cache.controller'

describe('ExampleCacheController', () => {
  let controller: ExampleCacheController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleCacheController],
    }).compile()

    controller = module.get<ExampleCacheController>(ExampleCacheController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
