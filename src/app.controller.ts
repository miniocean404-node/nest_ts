import { Controller, Get, Inject, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@ApiTags('App')
@Controller('app')
export class AppController {
  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger

  constructor() {}

  @Get('hello')
  helloApp() {
    this.logger.info(`header/menu -> ${JSON.stringify(1)}`)
    return 'hello app'
  }
}
