import { resolve } from '@/utils/path'
import dotenv from 'dotenv'

const env: string = process.env.NODE_ENV || 'development'

// 获取环境配置
function getDotEnv() {
	const path = resolve(`.env.${env}`)
	return dotenv.config({ path }).parsed || {}
}

const dotenvConfig = getDotEnv()
const { LOG_OUT_DIR, Temp_File_Path } = dotenvConfig

const pathConfig = {
	LOG_OUT_DIR: resolve(LOG_OUT_DIR),
	Temp_File_Path: resolve(Temp_File_Path),
}

const NODE_VARIABLE = Object.assign({ NODE_ENV: env }, dotenvConfig, pathConfig)

export default NODE_VARIABLE
