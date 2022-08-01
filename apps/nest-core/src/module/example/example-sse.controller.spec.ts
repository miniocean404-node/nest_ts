import { Test, TestingModule } from '@nestjs/testing'
import { ExampleSseController } from './example-sse.controller'

describe('ExampleSseController', () => {
  let controller: ExampleSseController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleSseController],
    }).compile()

    controller = module.get<ExampleSseController>(ExampleSseController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
