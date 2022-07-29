async function update() {
  const dataSource = null

  // 您可以使用创建UPDATE查询QueryBuilder。例子：
  await dataSource
    .createQueryBuilder()
    .update(User)
    .set({ firstName: 'Timber', lastName: 'Saw' })
    .where('id = :id', { id: 1 })
    .execute()

  // 在某些情况下，当您需要执行 SQL 查询时，您需要使用函数样式值：
  await dataSource
    .createQueryBuilder()
    .update(User)
    .set({
      firstName: 'Timber',
      lastName: 'Saw',
      age: () => 'age + 1',
    })
    .where('id = :id', { id: 1 })
    .execute()
}
