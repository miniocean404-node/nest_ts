import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common'

// 控制器版本
@Controller({
  path: 'example-version',
  version: VERSION_NEUTRAL, // 多个版本 version: ['1', '2'], 单一版本: version: '1', VERSION_NEUTRAL 随便什么版本号
})
export class ExampleVersionController {
  @Get('cats')
  findAll(): string {
    return 'This action returns all cats for version 1'
  }

  // 接口版本
  @Version('1')
  @Get('cats')
  findAllV1(): string {
    return 'This action returns all cats for version 1'
  }

  @Version('2')
  @Get('cats')
  findAllV2(): string {
    return 'This action returns all cats for version 2'
  }
}
