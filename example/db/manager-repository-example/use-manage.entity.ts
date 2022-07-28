// 使用EntityManager您可以管理（插入、更新、删除、加载等）任何实体。EntityManager 就像一个地方的所有实体存储库的集合。
// 您可以通过 DataSource 访问实体管理器。示例如何使用它：
import { DataSource } from 'typeorm'

const useManage = async () => {
  const myDataSource = new DataSource()
  const user = await myDataSource.manager.findOneBy(User, {
    id: 1,
  })
  user.name = 'name'
  await myDataSource.manager.save(user)
}
