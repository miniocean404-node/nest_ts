import { NoAuth } from '@/common/decorator/custom'
import { Controller, Get, Req, Res } from '@nestjs/common'

// 如果你想把相应处理逻辑留给框架，需要将passthrough参数设置为true
@Controller('example-cookie')
export class ExampleCookieController {
  @Get()
  @NoAuth()
  findAll(@Req() req: any, @Res({ passthrough: true }) response: any) {
    // 设置 cookie
    response.cookie('key', 'value')

    console.log(req.Cookies)
    console.log(req.signedCookies)
  }
}
