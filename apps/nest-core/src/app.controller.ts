import { Controller, Get, Render } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { NoAuth } from './common/decorator/custom'

@ApiTags('App')
@Controller('app')
export class AppController {
  // 视图根目录
  @Get()
  @NoAuth()
  @Render('index')
  root() {
    return { message: 'Hello Pug!' }
  }
}
