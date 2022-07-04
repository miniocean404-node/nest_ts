import { UserEntity } from '@/db/user.entity'
import { RegisterDto } from '@/module/login/dto/register.dto'
import { encryptPassword, makeSalt } from '@/utils/encrypt'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRep: Repository<UserEntity>
  ) {}

  // 查询是否有该用户
  async findOne(reqBody: RegisterDto): Promise<UserEntity | null> {
    try {
      const user = await this.userRep.findOne({ where: reqBody })

      return user
    } catch (error) {
      return error
    }
  }

  // 注册
  async register(reqBody: RegisterDto): Promise<any> {
    const { mobile, username, password } = reqBody

    const user = await this.findOne(reqBody)

    if (user) return { msg: '用户已存在' }

    const salt = makeSalt() // 制作密码盐
    const hashPwd = encryptPassword(password, salt) // 加密密码

    await this.userRep.save({
      mobile,
      username,
      password,
      encryptPassword: hashPwd,
      salt,
    })

    return { msg: '注册成功' }
  }
}
