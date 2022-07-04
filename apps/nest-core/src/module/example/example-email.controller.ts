import { NoAuth } from '@/common/decorator/custom'
import { Controller, Get } from '@nestjs/common'
import { ExampleEmailService } from './example-email.service'

@Controller('example-email')
export class ExampleEmailController {
  constructor(private readonly exampleEmailService: ExampleEmailService) {}

  @NoAuth()
  @Get('email')
  async sendEmail() {
    await this.exampleEmailService.send()

    return { msg: '邮件已发送' }
  }
}
