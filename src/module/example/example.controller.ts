import type { EnvironmentVariables } from '@/typings/dotenv'
import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Cache } from 'cache-manager'
import { CreateTestDto } from './dto/create-example.dot'
import { ExampleService } from './example.service'

ApiTags('例子')
@Controller('example')
// 自动缓存响应
@UseInterceptors(CacheInterceptor)
export class ExampleController {
  @Inject('InjectName')
  private readonly inject // 这样在执行方法中使用this.inject会有值，在构造函数中无值

  constructor(
    private readonly service: ExampleService, // @Inject('InjectName') inject, // 这样注入在构造函数中有值
    private configService: ConfigService<EnvironmentVariables>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
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

  @Get('example/cache')
  // 独立的缓存设置
  @CacheKey('custom_key')
  @CacheTTL(20)
  async cache() {
    // ttl 过期时间 永不过期，ttl 为 0
    await this.cacheManager.set('key', 'value', { ttl: 1000 })
    const value = await this.cacheManager.get('key')
    await this.cacheManager.del('key')

    // 清空所有缓存
    await this.cacheManager.reset()
  }
}
