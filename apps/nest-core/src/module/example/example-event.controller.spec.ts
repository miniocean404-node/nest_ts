import { Test, TestingModule } from '@nestjs/testing'
import { ExampleEventController } from './example-event.controller'

describe('ExampleEventController', () => {
  let controller: ExampleEventController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleEventController],
    }).compile()

    controller = module.get<ExampleEventController>(ExampleEventController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
