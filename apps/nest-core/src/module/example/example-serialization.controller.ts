import { NoAuth } from '@app/nest-core/common/decorator/custom'
import { ClassSerializerInterceptor, Controller, Get, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { ExampleSerializationEntity } from './serialization/example-serialization.entity'

// 序列化，响应排除 数据
@Controller('example-serialization')
export class ExampleSerializationController {
  // 使用 序列化 转换器
  @UseInterceptors(ClassSerializerInterceptor)
  // 修改转换函数的默认行为
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @Get()
  @NoAuth()
  findOne(): ExampleSerializationEntity {
    return new ExampleSerializationEntity({
      id: 1,
      firstName: 'Kamil',
      lastName: 'Mysliwiec',
      password: 'password',
      _ignore: 'ignore',
    })
  }
}
