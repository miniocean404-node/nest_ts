import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateLoginDto } from './dto/create-login.dot';

@Controller('login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @ApiOperation({ summary: '登录' })
  @Post('article')
  login(@Body() post: CreateLoginDto): string {
    return this.service.getHello();
  }

  @ApiOperation({ summary: '获取登录信息' })
  @Get('article')
  getLoginInfo(@Query() post: CreateLoginDto): string {
    return this.service.getHello();
  }
}
