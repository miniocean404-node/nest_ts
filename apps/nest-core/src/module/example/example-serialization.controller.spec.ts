import { Test, TestingModule } from '@nestjs/testing'
import { ExampleSerializationController } from './example-serialization.controller'

describe('ExampleSerializationController', () => {
  let controller: ExampleSerializationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleSerializationController],
    }).compile()

    controller = module.get<ExampleSerializationController>(ExampleSerializationController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
