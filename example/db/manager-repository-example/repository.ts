class User {}

async function UserRepositoryExtend() {
  const repository = null
  const user = null
  const category1 = null
  const category2 = null
  const dataSource = null
  const Entity = null
  const userRepository = null

  // manager-EntityManager此存储库使用的。
  const manager = repository.manager
  // metadata-EntityMetadata由该存储库管理的实体。了解有关实体元数据中事务的更多信息。
  const metadata = repository.metadata
  // queryRunner- 使用的查询运行器EntityManager。仅在 EntityManager 的事务实例中使用。
  const queryRunner = repository.queryRunner
  // target- 此存储库管理的目标实体类。仅在 EntityManager 的事务实例中使用。
  const target = repository.target
  // createQueryBuilder- 创建用于构建 SQL 查询的查询构建器。了解有关QueryBuilder的更多信息。
  const users = await repository.createQueryBuilder('user').where('user.name = :name', { name: 'John' }).getMany()
  // hasId- 检查给定实体的主列属性是否已定义。
  repository.hasId(user)

  // getId- 获取给定实体的主列属性值。如果实体具有复合主键，则返回的值将是具有主列名称和值的对象。
  const userId = repository.getId(user) // userId === 1
  // create- 创建一个新的实例User。可选择接受带有用户属性的对象文字，该属性将被写入新创建的用户对象
  const user1 = repository.create() // same as const user = new User();
  const user2 = repository.create({
    id: 1,
    firstName: 'Timber',
    lastName: 'Saw',
  }) // same as const user = new User(); user.firstName = "Timber"; user.lastName = "Saw";
  // merge- 将多个实体合并为一个实体。
  const user3 = new User()
  repository.merge(user3, { firstName: 'Timber' }, { lastName: 'Saw' }) // same as user.firstName = "Timber"; user.lastName = "Saw";
  // preload- 从给定的普通 javascript 对象创建一个新实体。如果实体已经存在于数据库中，则加载它（以及与之相关的所有内容），用给定对象中的新值替换所有值，然后返回新实体。新实体实际上是从数据库加载的实体，所有属性都从新对象替换。
  // 请注意，给定的类实体对象必须具有实体 id / 主键才能找到实体。如果未找到具有给定 id 的实体，则返回 undefined。
  const partialUser = {
    id: 1,
    firstName: 'Rizzrak',
    profile: {
      id: 1,
    },
  }
  const user4 = await repository.preload(partialUser)
  // user will contain all missing data from partialUser with partialUser property values:
  // { id: 1, firstName: "Rizzrak", lastName: "Saw", profile: { id: 1, ... } }
  // save- 保存给定的实体或实体数组。如果实体已存在于数据库中，则对其进行更新。如果实体在数据库中不存在，则将其插入。它将所有给定实体保存在单个事务中（在实体的情况下，管理器不是事务性的）。由于跳过了所有未定义的属性，因此还支持部分更新。返回保存的实体/实体。
  await repository.save(user)
  await repository.save([category1, category2])
  // remove- 删除给定的实体或实体数组。它在单个事务中删除所有给定实体（在实体的情况下，管理器不是事务性的）。返回删除的实体/实体。
  await repository.remove(user)
  await repository.remove([category1, category2])
  // insert- 插入一个新实体或实体数组。
  await repository.insert({
    firstName: 'Timber',
    lastName: 'Timber',
  })

  await repository.insert([
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
  await repository.update({ firstName: 'Timber' }, { firstName: 'Rizzrak' })
  // executes UPDATE user SET firstName = Rizzrak WHERE firstName = Timber

  await repository.update(1, { firstName: 'Rizzrak' })
  // executes UPDATE user SET firstName = Rizzrak WHERE id = 1
  // upsert- 插入一个新实体或实体数组，除非它们已经存在，在这种情况下它们会被更新。由 AuroraDataApi、Cockroach、Mysql、Postgres 和 Sqlite 数据库驱动程序支持。
  await repository.upsert(
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
  await repository.upsert(
    [
      { externalId: 'abc123', firstName: 'Rizzrak' },
      { externalId: 'bca321', firstName: 'Karzzir' },
    ],
    {
      conflictPaths: ['externalId'],
      skipUpdateIfNoValuesChanged: true, // supported by postgres, skips update if it would not change row values
    }
  )
  /** executes
   *  INSERT INTO user
   *  VALUES
   *      (externalId = abc123, firstName = Rizzrak),
   *      (externalId = cba321, firstName = Karzzir),
   *  ON CONFLICT (externalId) DO UPDATE
   *  SET firstName = EXCLUDED.firstName
   *  WHERE user.firstName IS DISTINCT FROM EXCLUDED.firstName
   **/
  // delete- 按实体 ID、ID 或给定条件删除实体：
  await repository.delete(1)
  await repository.delete([1, 2, 3])
  await repository.delete({ firstName: 'Timber' })
  // softDelete和restore- 按 id 软删除和恢复行
  const repository1 = dataSource.getRepository(Entity)
  // Delete a entity
  await repository.softDelete(1)
  // And You can restore it using restore;
  await repository.restore(1)
  // softRemove和recover- 这是和的替代softDelete品restore。
  // You can soft-delete them using softRemove
  const entities = await repository.find()
  const entitiesAfterSoftRemove = await repository.softRemove(entities)

  // And You can recover them using recover;
  await repository.recover(entitiesAfterSoftRemove)
  // increment- 通过提供的与给定选项匹配的实体值增加某些列。
  await repository.increment({ firstName: 'Timber' }, 'age', 3)
  // decrement- 通过提供的与给定选项匹配的值减少某些列。
  await repository.decrement({ firstName: 'Timber' }, 'age', 3)
  // count- 计算匹配的实体FindOptions。对分页很有用。
  const count = await repository.count({
    where: {
      firstName: 'Timber',
    },
  })
  // countBy- 计算匹配的实体FindOptionsWhere。对分页很有用。
  const count1 = await repository.countBy({ firstName: 'Timber' })
  // find- 查找与给定匹配的实体FindOptions。
  const timbers1 = await repository.find({
    where: {
      firstName: 'Timber',
    },
  })
  // findBy- 查找与给定匹配的实体FindWhereOptions。
  const timbers2 = await repository.findBy({
    firstName: 'Timber',
  })
  // findAndCount- 查找与给定匹配的实体FindOptions。还计算与给定条件匹配的所有实体，但忽略分页设置（从和获取选项）。
  const [timbers3, timbersCount3] = await repository.findAndCount({
    where: {
      firstName: 'Timber',
    },
  })
  // findAndCountBy- 查找与给定匹配的实体FindOptionsWhere。还计算与给定条件匹配的所有实体，但忽略分页设置（从和获取选项）。
  const [timbers4, timbersCount4] = await repository.findAndCountBy({
    firstName: 'Timber',
  })
  // findOne- 找到第一个匹配给定的实体FindOptions。
  const timber5 = await repository.findOne({
    where: {
      firstName: 'Timber',
    },
  })
  // findOneBy- 找到第一个匹配给定的实体FindOptionsWhere。
  const timber6 = await repository.findOneBy({ firstName: 'Timber' })
  // findOneOrFail- 查找与某些 id 或查找选项匹配的第一个实体。如果没有匹配项，则拒绝返回的承诺。
  const timber7 = await repository.findOneOrFail({
    where: {
      firstName: 'Timber',
    },
  })
  // findOneByOrFail- 找到第一个匹配给定的实体FindOptions。如果没有匹配项，则拒绝返回的承诺。
  const timber = await repository.findOneByOrFail({ firstName: 'Timber' })
  // query- 执行原始 SQL 查询。
  const rawData = await repository.query(`SELECT * FROM USERS`)
  // clear- 清除给定表中的所有数据（截断/删除它）。
  await repository.clear()
  // #附加选项
  // OptionalSaveOptions可以作为参数传递给save.

  // data- 要使用persist 方法传递的附加数据。然后可以在订阅者中使用此数据。
  // listeners: boolean - 指示是否为此操作调用侦听器和订阅者。默认情况下它们是启用的，您可以通过设置{ listeners: false }保存/删除选项来禁用它们。
  // transaction: boolean - 默认情况下启用事务，并且持久性操作中的所有查询都包装到事务中。{ transaction: false }您可以通过在持久性选项中进行设置来禁用此行为。
  // chunk: number - 将保存执行分成多组块。例如，如果您想保存 100.000 个对象，但在保存时遇到问题，您可以将它们分成 10 组，每组 10.000 个对象（通过设置{ chunk: 10000 }）并分别保存每个组。当您遇到底层驱动程序参数数量限制问题时，需要此选项来执行非常大的插入。
  // reload: boolean - 用于确定是否应在持久化操作期间重新加载正在持久化的实体的标志。它仅适用于不支持 RETURNING / OUTPUT 语句的数据库。默认启用。
  // 例子：

  // users contains array of User Entities
  userRepository.save(users, { chunk: users.length / 1000 })
  // OptionalRemoveOptions可以作为remove和的参数传递delete。

  // data- 要使用 remove 方法传递的附加数据。然后可以在订阅者中使用此数据。
  // listeners: boolean - 指示是否为此操作调用侦听器和订阅者。默认情况下它们是启用的，您可以通过设置{ listeners: false }保存/删除选项来禁用它们。
  // transaction: boolean - 默认情况下启用事务，并且持久性操作中的所有查询都包装到事务中。{ transaction: false }您可以通过在持久性选项中进行设置来禁用此行为。
  // chunk: number - 将删除执行分成多组块。例如，如果您想删除 100.000 个对象，但这样做有问题，您可以通过设置将它们分成 10 组，每组 10.000 个对象，{ chunk: 10000 }然后分别删除每个组。当您遇到底层驱动程序参数数量限制问题时，需要此选项来执行非常大的删除。
  // 例子：

  // users contains array of User Entities
  userRepository.remove(users, { chunk: entities.length / 1000 })
}
