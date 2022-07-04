import { CreateTestDto } from '@app/nest-core/module/example/dto/create-example.dto'
import { ExampleService } from '@app/nest-core/module/example/example.service'
import { EnvironmentVariables } from '@app/nest-core/typings/dotenv'
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation } from '@nestjs/swagger'

@Controller('example-method')
export class ExampleMethodController {
  constructor(
    private readonly service: ExampleService, // @Inject('InjectName') inject, // 这样注入在构造函数中有值
    private configService: ConfigService<EnvironmentVariables>
  ) {}

  @ApiOperation({ summary: '获取测试信息' })
  @Get('query')
  getLoginInfo(@Query() params: CreateTestDto): object {
    console.log(this.configService.get<string>('PORT', 'default value', { infer: true }))

    return this.service.getHello()
  }

  @ApiOperation({ summary: 'body 请求体' })
  @Post('body')
  login1(@Body() params: CreateTestDto): object {
    return this.service.getHello()
  }
}
