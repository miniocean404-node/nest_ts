import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common'

// 控制器版本
@Controller({
  path: 'example-version',
  version: VERSION_NEUTRAL, // 多个版本 version: ['1', '2'], 单一版本: version: '1', VERSION_NEUTRAL 随便什么版本号
})
export class ExampleVersionController {
  // 下面有一个 v1 版本将默认的 v1版本覆盖了 所以这个接口没有版本
  @Get('version')
  findAll(): any {
    return { data: '默认版本' }
  }

  // 接口版本
  @Version('1')
  @Get('version')
  findAllV1(): any {
    return { data: '版本1' }
  }

  @Version('2')
  @Get('version')
  findAllV2(): any {
    return { data: '版本2' }
  }
}
