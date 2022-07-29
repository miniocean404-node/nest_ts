async function insert() {
  const dataSource = null

  //   您可以使用创建INSERT查询QueryBuilder。例子：
  await dataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      { firstName: 'Timber', lastName: 'Saw' },
      { firstName: 'Phantom', lastName: 'Lancer' },
    ])
    .execute()

  // 在某些情况下，当您需要执行 SQL 查询时，您需要使用函数样式值：
  // 此语法不会转义您的值，您需要自己处理转义。
  await dataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      firstName: 'Timber',
      lastName: () => "CONCAT('S', 'A', 'W')",
    })
    .execute()
}
