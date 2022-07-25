import cacheConfig from '@app/nest-core/config/cache.config'
import dbConfig from '@app/nest-core/config/db.config'
import nestConfig from '@app/nest-core/config/dotenv.config'
import emailConfig from '@app/nest-core/config/email.config'
import winstonConfig from '@app/nest-core/config/logger.config'
import queueConfig from '@app/nest-core/config/queue.config'
export { default as eventConfig } from '@app/nest-core/config/event.config'

const allConfig = [nestConfig, emailConfig, cacheConfig, queueConfig, dbConfig, winstonConfig]

export default allConfig
