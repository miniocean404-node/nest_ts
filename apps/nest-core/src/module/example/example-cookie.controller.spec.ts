import { Test, TestingModule } from '@nestjs/testing'
import { ExampleCookieController } from './example-cookie.controller'

describe('ExampleCookieController', () => {
  let controller: ExampleCookieController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleCookieController],
    }).compile()

    controller = module.get<ExampleCookieController>(ExampleCookieController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
