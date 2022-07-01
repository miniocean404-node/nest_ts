module.exports = {
  type: 'mysql',
  host: 'localhost',
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
