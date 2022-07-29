async function useEntityManager() {
  const manager = null
  const User = null
  const user = {}
  const category1 = null
  const category2 = null

  // dataSource- 使用的数据源EntityManager。
  const dataSource = manager.dataSource

  // queryRunner- 使用的查询运行器EntityManager。仅在 EntityManager 的事务实例中使用。
  const queryRunner = manager.queryRunner

  // transaction- 提供一个事务，其中多个数据库请求将在单个数据库事务中执行。
  await manager.transaction(async (manager) => {})

  // query- 执行原始 SQL 查询。
  const rawData = await manager.query(`SELECT * FROM USERS`)

  // createQueryBuilder- 创建用于构建 SQL 查询的查询构建器
  const users = await manager
    .createQueryBuilder()
    .select()
    .from(User, 'user')
    .where('user.name = :name', { name: 'John' })
    .getMany()

  // hasId- 检查给定实体是否定义了其主列属性。bool
  manager.hasId(user)

  // getId- 获取给定实体的主列属性值。如果实体具有复合主键，则返回值将是具有主列名称和值的对象。
  const userId = manager.getId(user)

  // create- 创建一个新的实例User。可选地接受带有用户属性的对象文字，该属性将被写入新创建的用户对象。
  const user1 = manager.create(User) // same as const user = new User();
  const user2 = manager.create(User, {
    id: 1,
    firstName: 'Timber',
    lastName: 'Saw',
  }) // same as const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";

  // merge- 将多个实体合并为一个实体。
  const user3 = new User()
  manager.merge(User, user, { firstName: 'Timber' }, { lastName: 'Saw' }) // same as user.firstName = "Timber"; user.lastName = "Saw";

  //   preload- 从给定的普通 javascript 对象创建一个新实体。如果实体已经存在于数据库中，
  //   则加载它（以及与之相关的所有内容），用给定对象中的新值替换所有值，并返回新实体。新实体实际上是从数据库实体加载的，所有属性都由新对象替换。
  const partialUser = {
    id: 1,
    firstName: 'Rizzrak',
    profile: {
      id: 1,
    },
  }
  const user4 = await manager.preload(User, partialUser)
  // user will contain all missing data from partialUser with partialUser property values:
  // { id: 1, firstName: "Rizzrak", lastName: "Saw", profile: { id: 1, ... } }

  // save- 保存给定的实体或实体数组。如果实体已经存在于数据库中，那么它会被更新。
  // 如果实体在数据库中尚不存在，则将其插入。它将所有给定的实体保存在单个事务中（在实体管理器不是事务的情况下）。
  // 由于跳过了所有未定义的属性，因此还支持部分更新。为了产生一个值NULL，您必须手动将属性设置为 equal null。
  await manager.save(user)
  await manager.save([category1, category2])

  // remove- 删除给定的实体或实体数组。它在单个事务中删除所有给定实体（在实体的情况下，管理器不是事务性的）。
  await manager.remove(user)
  await manager.remove([category1, category2])

  // insert- 插入一个新实体或实体数组。
  await manager.insert(User, {
    firstName: 'Timber',
    lastName: 'Timber',
  })

  await manager.insert(User, [
    {
      firstName: 'Foo',
      lastName: 'Bar',
    },
    {
      firstName: 'Rizz',
      lastName: 'Rak',
    },
  ])

  // update- 通过给定的更新选项或实体 ID 部分更新实体。
  await manager.update(User, { firstName: 'Timber' }, { firstName: 'Rizzrak' })
  // executes UPDATE user SET firstName = Rizzrak WHERE firstName = Timber

  await manager.update(User, 1, { firstName: 'Rizzrak' })
  // executes UPDATE user SET firstName = Rizzrak WHERE id = 1

  // upsert- 插入一个新实体或实体数组，除非它们已经存在，在这种情况下它们会被更新。由 AuroraDataApi、Cockroach、Mysql、Postgres 和 Sqlite 数据库驱动程序支持。
  await manager.upsert(
    User,
    [
      { externalId: 'abc123', firstName: 'Rizzrak' },
      { externalId: 'bca321', firstName: 'Karzzir' },
    ],
    ['externalId']
  )
  /** executes
   *  INSERT INTO user
   *  VALUES
   *      (externalId = abc123, firstName = Rizzrak),
   *      (externalId = cba321, firstName = Karzzir),
   *  ON CONFLICT (externalId) DO UPDATE firstName = EXCLUDED.firstName
   **/

  // delete- 按实体 ID、ID 或给定条件删除实体：
  await manager.delete(User, 1)
  await manager.delete(User, [1, 2, 3])
  await manager.delete(User, { firstName: 'Timber' })

  // increment- 通过提供的与给定选项匹配的实体值增加某些列。
  await manager.increment(User, { firstName: 'Timber' }, 'age', 3)

  // decrement- 通过提供的与给定选项匹配的值减少某些列。
  await manager.decrement(User, { firstName: 'Timber' }, 'age', 3)

  // count- 计算匹配的实体FindOptions。对分页很有用。
  const count = await manager.count(User, {
    where: {
      firstName: 'Timber',
    },
  })
}
