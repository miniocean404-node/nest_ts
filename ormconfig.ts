module.exports = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'dhy19961025',
  //   password: 'root',
  database: 'user',
  synchronize: true,
  // timezone: 'UTC',
  logging: false,
  multipleStatements: true,
  dropSchema: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  cli: {
    entitiesDir: 'dist/core/db',
  },
}
