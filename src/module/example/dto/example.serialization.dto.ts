import { CreateTestDto } from '@/module/example/dto/create-example.dto'
import { Exclude, Expose, Transform } from 'class-transformer'

export class ExampleSerializationEntity {
  id: number
  firstName: string
  lastName: string

  _ignore: string

  // 可以使用 @Transform() 装饰器执行其他数据转换。例如，您要选择一个名称 RoleEntity 而不是返回整个对象
  @Transform((role) => role.value)
  role: CreateTestDto

  @Exclude()
  password: string

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  constructor(partial: Partial<ExampleSerializationEntity>) {
    Object.assign(this, partial)
  }
}
