import cacheConfig from '@/config/cache.config'
import dbConfig from '@/config/db.config'
import nestConfig from '@/config/dotenv.config'
import emailConfig from '@/config/email.config'
import winstonConfig from '@/config/logger.config'
import queueConfig from '@/config/queue.config'
export { default as eventConfig } from '@/config/event.config'

const allCofnig = [nestConfig, emailConfig, cacheConfig, queueConfig, dbConfig, winstonConfig]

export default allCofnig
