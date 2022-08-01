import { Test, TestingModule } from '@nestjs/testing'
import { ExampleScheduleController } from './example-schedule.controller'

describe('ExampleScheduleController', () => {
  let controller: ExampleScheduleController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleScheduleController],
    }).compile()

    controller = module.get<ExampleScheduleController>(ExampleScheduleController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
