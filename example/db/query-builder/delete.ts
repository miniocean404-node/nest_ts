async function executeDelete() {
  const myDataSource = null
  const dataSource = null
  const Entity = null

  // 您可以使用创建DELETE查询QueryBuilder。例子：
  await myDataSource.createQueryBuilder().delete().from(User).where('id = :id', { id: 1 }).execute()

  // 将软删除应用于 QueryBuilder
  await dataSource.getRepository(Entity).createQueryBuilder().softDelete()

  // 或者，您可以使用以下restore()方法恢复软删除的行：
  await dataSource.getRepository(Entity).createQueryBuilder().restore()
}
