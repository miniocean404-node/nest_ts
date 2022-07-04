import { Controller, Get, Request } from '@nestjs/common'

@Controller('example-csrf')
export class ExampleCsrfController {
  // 返回 token 给个客户端使用 这个token 会和设置的 _csrf cookie的值校验
  @Get('getToken')
  getCsrfToken(@Request() req) {
    return { data: { token: req.csrfToken() } }
  }
}
