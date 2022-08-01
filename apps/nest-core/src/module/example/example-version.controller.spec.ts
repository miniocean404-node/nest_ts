import { Test, TestingModule } from '@nestjs/testing'
import { ExampleVersionController } from './example-version.controller'

describe('ExampleVersionController', () => {
  let controller: ExampleVersionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleVersionController],
    }).compile()

    controller = module.get<ExampleVersionController>(ExampleVersionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
