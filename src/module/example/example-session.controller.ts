import { Controller, Get, Req } from '@nestjs/common'

// 读取 session
@Controller('example-session')
export class ExampleSessionController {
  @Get()
  findAll(@Req() req: any) {
    req.session.visits = req.session.visits ? req.session.visits + 1 : 1
  }
}
