import { registerAs } from '@nestjs/config'

const dbConfig = registerAs('db', () => ({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  // password: 'dhy19961025',
  password: 'root',
  database: 'user', // 连接的数据库名
  retryAttempts: 10, // 重试连接数据库的次数（默认：10）
  retryDelay: 3000, // 两次重试连接的间隔(ms)（默认：3000）
  autoLoadEntities: true, // 如果为true,将自动加载实体(默认：false)
  keepConnectionAlive: false, // 如果为true，在应用程序关闭后连接不会关闭（默认：false)
  synchronize: true,
  logging: false,
  multipleStatements: true,
  dropSchema: false,
  entities: ['dist/db/**/*.entity{.ts,.js}'],
  cli: {
    entitiesDir: 'dist/core/db',
  },
}))

export default dbConfig
