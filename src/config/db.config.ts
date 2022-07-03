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

  keepConnectionAlive: false, // 如果为true，在应用程序关闭后连接不会关闭（默认：false)
  synchronize: true,
  logging: false,
  multipleStatements: true,
  dropSchema: false,
  // 通过路径自动导入实体
  entities: ['dist/db/**/*.entity{.ts,.js}'],
  // 如果为true,将自动加载实体(默认：false) 每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组中。
  // 那些没有通过forFeature()方法注册，而仅仅是在实体中被引用（通过关系）的实体不能通过autoLoadEntities配置被包含。
  autoLoadEntities: false,
  cli: {
    entitiesDir: 'dist/core/db',
  },
}))

export default dbConfig
