import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({ description: '用户信息' })
  @IsNotEmpty({ message: '用户信息必填' })
  readonly userName: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @ApiPropertyOptional({ description: '内容' }) // 可选参数
  readonly content: string;

  @ApiPropertyOptional({ description: '文章封面' })
  readonly cover_url: string;

  @ApiProperty({ description: '登录类型' })
  @IsNumber()
  readonly type: number;
}
