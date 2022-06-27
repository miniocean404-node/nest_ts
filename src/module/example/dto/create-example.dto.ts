import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateTestDto {
  @ApiProperty({ description: '用户信息' })
  @IsNotEmpty({ message: 'userName 必填' })
  readonly userName: string

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: 'password 不能为空' })
  readonly password: string

  @ApiPropertyOptional({ description: '内容' }) // 可选参数
  readonly content: string

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string

  @ApiProperty({ description: '登录类型' })
  @IsNumber(undefined, { message: 'type 必须为数字' })
  readonly type: number
}
