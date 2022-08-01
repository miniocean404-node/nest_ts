import { Test, TestingModule } from '@nestjs/testing'
import { ExampleSessionController } from './example-session.controller'

describe('ExampleSessionController', () => {
  let controller: ExampleSessionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleSessionController],
    }).compile()

    controller = module.get<ExampleSessionController>(ExampleSessionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
