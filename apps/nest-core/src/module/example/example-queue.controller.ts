import { NoAuth } from '@app/nest-core/common/decorator/custom'
import { ExampleQueueService } from '@app/nest-core/module/example/example-queue.service'
import { Controller, Get } from '@nestjs/common'

@Controller('example-queue')
export class ExampleQueueController {
  constructor(private readonly queueService: ExampleQueueService) {}

  @Get('queue')
  @NoAuth()
  async addTask() {
    await this.queueService.addTask()
  }
}
