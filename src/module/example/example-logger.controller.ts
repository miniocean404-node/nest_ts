import { Controller, Get, Inject } from '@nestjs/common'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@Controller('example-logger')
export class ExampleLoggerController {
  // { provide: 'winston', useFactory: [Function: useFactory] } provide提供的必须是字符串
  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger

  @Get('logger')
  logTest() {
    this.logger.info(`日志 -> ${JSON.stringify(1)}`)
    return { msg: '日志打印成功' }
  }
}
