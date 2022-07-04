import { NoAuth } from '@app/nest-core/common/decorator/custom'
import { CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, UseInterceptors } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Controller('example-cache')
export class ExampleCacheController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @NoAuth()
  @Get('cache')
  // 独立的缓存设置
  @CacheKey('custom_key')
  @CacheTTL(20)
  // 自动缓存响应，只需在想缓存数据的地方绑定CacheInterceptor
  @UseInterceptors(CacheInterceptor)
  async cache() {
    // ttl 过期时间 永不过期，ttl 为 0
    await this.cacheManager.set('key', 'value', { ttl: 1000 })
    const value = await this.cacheManager.get('key')

    await this.cacheManager.del('key')

    // 清空所有缓存
    await this.cacheManager.reset()

    return value
  }
}
