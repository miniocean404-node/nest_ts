import { Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  // 1. 固定路径：
  // 可以匹配到 get请求，http://localhost:9080/app/list
  @Get('list')
  getList(): string {
    return this.service.getHello();
  }

  // 可以匹配到 post请求，http://localhost:9080/app/list
  @Post('list')
  createList(): string {
    return this.service.getHello();
  }

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get('user_*')
  getUser() {
    return 'getUser';
  }

  // 如果匹配过程中， 发现@Put("list/:id")已经满足了,就不会继续往下匹配了，所以 @Put("list/user")装饰的方法应该写在它之前。
  @Put('list/user')
  updateUser() {
    return { userId: 1 };
  }

  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put('list/:id')
  update() {
    return 'update';
  }
}
