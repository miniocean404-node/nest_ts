import cookieParser from 'cookie-parser'
import csrf from 'csurf'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

const middleware = [
	helmet(), // 通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响。
	cookieParser(),
	csrf({ cookie: true }), // CSRF保护
	// 为了保护您的应用程序免受暴力攻击，您必须实现某种速率限制
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // 将每个 IP 限制为每个窗口 1Ms 100 个请求
		standardHeaders: true, // 在 `RateLimit-*` 头中返回速率限制信息
		legacyHeaders: false, // 禁用 `X-RateLimit-*` 头
	}),
]

export default middleware
