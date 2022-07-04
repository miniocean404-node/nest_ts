import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumberString } from 'class-validator'

export class RegisterDto {
  @ApiProperty({ description: '用户信息' })
  @IsNotEmpty({ message: '用户信息必填' })
  readonly username?: string

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password?: string

  @ApiProperty({ description: '密码' })
  @IsNumberString(null, { message: '手机号必须是数字字符串' })
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile?: number
}
