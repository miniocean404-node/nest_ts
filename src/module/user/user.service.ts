import { encryptPassword, makeSalt } from '@/utils/cryptogram'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
	// 查询是否有该用户
	async findOne(username: string): Promise<any | undefined> {
		try {
			return { username: 'user', password: 'wZcAtvIFeVYOPv0e9Q9Mmg==', salt: 'shinobi7414' }
		} catch (error) {
			return error
		}
	}

	// 注册
	async register(requestBody: any): Promise<any> {
		const { accountName, realName, password, rePassword, mobile } = requestBody

		const user = await this.findOne(accountName)
		if (user) return '用户已存在'

		const salt = makeSalt() // 制作密码盐
		const hashPwd = encryptPassword(password, salt) // 加密密码

		const registerSQL = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `
		try {
			// await sequelize.query(registerSQL, { logging: false });
			return {
				code: 200,
				msg: 'Success',
			}
		} catch (error) {
			return {
				code: 503,
				msg: `Service error: ${error}`,
			}
		}
	}
}
