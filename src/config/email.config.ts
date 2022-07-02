import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { registerAs } from '@nestjs/config'
import { normalize } from 'path'

// @nestjs-modules/mailer 使用文章 https://juejin.cn/post/6941340028849094670
// 需要开启 SMTP 服务
const emailConfig = registerAs('email', () => ({
  transport: {
    // host: 'smtp.qq.com', // 邮箱服务的主机，如smtp.qq.com
    service: 'QQ',
    port: 587,
    ignoreTLS: true,
    secure: false,
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
    },
    auth: {
      user: '1037306928@qq.com',
      pass: 'skvnsoajdzsdbfhb',
    },
  },
  defaults: {
    from: '"发送人" <user@qq.com>',
    // 邮件主题
    subject: '您有一条新消息',
  },
  preview: true,
  template: {
    dir: `${normalize(`${process.cwd()}/src/templates`)}`,
    // 默认适配器中更改inline-css选项甚至禁用它
    adapter: new PugAdapter({
      inlineCssEnabled: true,
      // inlineCssOptions: { url: '' },
    }),
    options: {
      strict: true,
    },
  },
}))

export default emailConfig
