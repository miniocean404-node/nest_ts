import { Controller, Get, Inject } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@ApiTags('App')
@Controller('app')
export class AppController {
  // { provide: 'winston', useFactory: [Function: useFactory] } provide提供的必须是字符串
  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger

  constructor() {}

  @Get('hello')
  helloApp() {
    this.logger.info(`header/menu -> ${JSON.stringify(1)}`)
    return 'hello app'
  }
}
