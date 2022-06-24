import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

const middleware = [
  // 通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响。
  helmet(),

  // 解析请求体，为了 csrf 可以拿到请求体中的内容
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  // 必须在 csrf 前使用 cookieParser
  cookieParser(),

  // CSRF (跨站脚本攻击) 保护
  // httpOnly 只能是否是 web 服务器访问
  // key 存储令牌秘密的 cookie 的名称
  // 服务端会生成秘钥 secret 设置客户端 cookie ,需要传递 返回token 也给客户端让他携带回来
  // csurf({ cookie: { key: '_csrf', path: '/', secure: false, maxAge: 3000, httpOnly: false, signed: false, sameSite: 'none' } }),

  // 为了保护您的应用程序免受暴力攻击，您必须实现某种速率限制
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 将每个 IP 限制为每个窗口 1Ms 100 个请求
    standardHeaders: true, // 在 `RateLimit-*` 头中返回速率限制信息
    legacyHeaders: false, // 禁用 `X-RateLimit-*` 头
  }),
]

export default middleware
