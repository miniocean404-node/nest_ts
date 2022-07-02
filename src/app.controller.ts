import { NoAuth } from '@/common/decorator/custom'
import { Controller, Get, Inject, Render } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@ApiTags('App')
@Controller('app')
export class AppController {
  // { provide: 'winston', useFactory: [Function: useFactory] } provide提供的必须是字符串
  @Inject(WINSTON_MODULE_PROVIDER)
  private readonly logger: Logger

  @Get('hello')
  helloApp() {
    this.logger.info(`日志 -> ${JSON.stringify(1)}`)
    return { data: null }
  }

  // 视图跟目录
  @Get()
  @NoAuth()
  @Render('index')
  root() {
    return { message: 'Hello Pug!' }
  }
}
