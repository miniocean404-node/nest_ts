import { Controller, Get, Req, Res } from '@nestjs/common'

// secret： 一个字符串或者数组，用来给cookie签名。如果不指定这个选项，将不解析签名的cookie。如果提供了一个字符串，那么它会被用来作为secret。如果提供了一个数组，将尝试依次使用其元素来作为secret解析cookie。
// option：一个作为第二个参数传递给cookie.parse的对象，参见[cookie](https://www.npmjs.org/package/cookie)来了解更多内容。
// 该中间件将从请求的头文件中解析Cookie并将其数据作为req.cookies暴露出来。如果提供了secret，将暴露为req.signedCookies。这些属性以cookie名称和属性的键值对保存。
// 当提供了 secret 时，该中间件将解析并验证所有签名的cookie并将其值从req.cookies移动到req.signedCookies。签名cookie是指包含s:前缀的cookie。验证失败的签名cookie值会被替换为false而不是被篡改过的值。

// 如果你想把相应处理逻辑留给框架，需要将passthrough参数设置为true
@Controller('example-cookie')
export class ExampleCookieController {
  @Get()
  findAll(@Req() request: any, @Res({ passthrough: true }) response: any) {
    response.cookie('key', 'value')

    console.log(request.signedCookies)
  }
}
