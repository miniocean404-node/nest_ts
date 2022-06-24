// https://www.kancloud.cn/juukee/nestjs/2675354

export const nestConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  node_env: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
})
