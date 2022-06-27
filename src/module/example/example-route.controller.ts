import { Body, Controller, Get, Put } from '@nestjs/common'

@Controller('example-route')
export class ExampleRouteController {
  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get('example_*')
  getUser() {
    return { data: 'getUser' }
  }

  // 如果匹配过程中， 发现@Put("list/:id")已经满足了,就不会继续往下匹配了，所以 @Put("list/user")装饰的方法应该写在它之前。
  @Put('example/user')
  updateUser(@Body() params) {
    return { data: { userId: 1 } }
  }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put('example/:id')
  update() {
    return { data: 'update' }
  }
}
