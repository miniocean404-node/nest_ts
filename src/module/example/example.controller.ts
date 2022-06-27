import { CacheInterceptor, Controller, Inject, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

ApiTags('例子')
@Controller('example')
// 自动缓存响应
@UseInterceptors(CacheInterceptor)
export class ExampleController {
  @Inject('InjectName')
  private readonly inject // 这样在执行方法中使用this.inject会有值，在构造函数中无值
}
