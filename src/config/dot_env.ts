import { resolve } from '@/utils/path'
import dotenv from 'dotenv'

const env: string = process.env.NODE_ENV || 'development'

// 获取环境配置
function getDotEnv() {
	const path = resolve(`.env.${env}`)
	return dotenv.config({ path }).parsed || {}
}

const NODE_VARIABLE = Object.assign({ NODE_ENV: env }, getDotEnv())

export default NODE_VARIABLE
