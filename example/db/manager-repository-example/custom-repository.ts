// 创建自定义仓库

const dataSource = null
const User = null

// 为了扩展 UserRepository 功能，您可以使用类.extend的方法Repository(提前定义好要查询数据库的函数)：
export const UserRepositoryExtend = dataSource.getRepository(User).extend({
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany()
  },
})

// user.controller.ts
export class UserControllerExtend {
  users() {
    return UserRepositoryExtend.findByName('Timber', 'Saw')
  }
}

/*
    事务有自己的执行范围：它们有自己的查询运行器、实体管理器和存储库实例。
    这就是为什么使用全局（数据源的）实体管理器和存储库在事务中不起作用的原因。
    为了在事务范围内正确执行查询，您必须使用提供的实体管理器及其getRepository方法。
    为了在事务中使用自定义存储库，您必须使用withRepository提供的实体管理器实例的方法：
*/

async function useTransactionsCustomRepositories() {
  const connection = null

  await connection.transaction(async (manager) => {
    const userRepository = manager.withRepository(UserRepositoryExtend)
    await userRepository.createAndSave('Timber', 'Saw')
    const timber = await userRepository.findByName('Timber', 'Saw')
  })
}
