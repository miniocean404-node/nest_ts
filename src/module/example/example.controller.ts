import type { EnvironmentVariables } from '@/typings/dotenv'
import { Body, Controller, Get, Inject, Post, Put, Query } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateTestDto } from './dto/create-example.dot'
import { ExampleService } from './example.service'

ApiTags('例子')
@Controller('example')
export class ExampleController {
  @Inject('InjectName')
  private readonly inject // 这样在执行方法中使用this.inject会有值，在构造函数中无值

  constructor(
    private readonly service: ExampleService, // @Inject('InjectName') inject, // 这样注入在构造函数中有值
    private configService: ConfigService<EnvironmentVariables>
  ) {}

  @Get('test')
  @ApiOperation({ summary: '获取测试信息' })
  getLoginInfo(@Query() params: CreateTestDto): object {
    console.log(this.configService.get<string>('PORT', 'default value', { infer: true }))

    return this.service.getHello()
  }

  @ApiOperation({ summary: '测试' })
  @Post('test')
  login1(@Body() params: CreateTestDto): object {
    return this.service.getHello()
  }

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
