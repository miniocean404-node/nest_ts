import { UserService } from '@/module/user/user.service'
import { encryptPassword } from '@/utils/encrypt'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息')
    const user = await this.usersService.findOne(username)

    if (user) {
      const hashedPassword = user.password
      const salt = user.salt

      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password || '123456', salt)

      if (hashedPassword === hashPassword) {
        // 密码正确
        return { user, code: 1 }
      } else {
        // 密码错误
        return { code: 2 }
      }
    }

    // 查无此人
    return { user: null }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      realName: user.realName,
      role: user.role,
    }
    console.log('JWT验证 - Step 3: 处理 jwt 签证')

    const token = this.getToken(payload)

    try {
      return {
        code: 200,
        data: {
          token,
        },
        msg: `登录成功`,
      }
    } catch (error) {
      return {
        code: 600,
        msg: `账号或密码错误`,
      }
    }
  }

  // 加密 token
  getToken(payload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  // 解密 token
  decodeToken(token: string) {
    const userInfo = this.jwtService.decode(token)
    return userInfo
  }
}
