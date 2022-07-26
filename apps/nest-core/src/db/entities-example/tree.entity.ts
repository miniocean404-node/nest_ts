import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree } from 'typeorm'

// 邻接表，就是用唯一 id 进行链接外部表
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne((type) => Category, (category) => category.children)
  parent: Category

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[]
}

// 嵌套集是在数据库中存储树结构的另一种模式。它对读取非常有效，但对写入不利。嵌套集中不能有多个根。例子：
@Entity()
@Tree('nested-set')
export class Category1 {
  @PrimaryGeneratedColumn()
  id: number
}

// 物化路径（也称为路径枚举）是另一种在数据库中存储树结构的模式。它简单而有效。例子：
@Entity()
@Tree('materialized-path')
export class Category2 {
  @PrimaryGeneratedColumn()
  id: number
}

// 闭包表以特殊的方式将父子关系存储在单独的表中。它在读取和写入方面都很有效。例子：
// options您可以通过将可选参数设置为来指定闭包表名称和/或闭包表列名称@Tree("closure-table", options)。
// ancestorColumnName和descandantColumnName是回调函数，它接收主列的元数据并返回列的名称。
@Entity()
@Tree('closure-table', {
  closureTableName: 'category_closure',
  ancestorColumnName: (column) => 'ancestor_' + column.propertyName,
  descendantColumnName: (column) => 'descendant_' + column.propertyName,
})
export class Category3 {
  @PrimaryGeneratedColumn()
  id: number
}

// 使用树实体,要将树实体相互绑定，需要在子实体中设置父实体，然后保存。例如：
async function useTreeEntity() {
  const dataSource = null
  const parentCategory = null
  const childCategory = null

  const a1 = new Category()
  a1.name = 'a1'
  await dataSource.manager.save(a1)

  const a11 = new Category()
  a11.name = 'a11'
  a11.parent = a1
  await dataSource.manager.save(a11)

  const a12 = new Category()
  a12.name = 'a12'
  a12.parent = a1
  await dataSource.manager.save(a12)

  const a111 = new Category()
  a111.name = 'a111'
  a111.parent = a11
  await dataSource.manager.save(a111)

  const a112 = new Category()
  a112.name = 'a112'
  a112.parent = a11
  await dataSource.manager.save(a112)

  /*
    对于以下方法，可以传递选项：
    找树
    找根
    寻找后代
    寻找后代树
    寻找祖先
    查找祖先树
    relations- 指示应加载实体的哪些关系（简化的左连接形式）。
    eslint-disable-next-line
  */
  const treeCategoriesWithRelations = await dataSource.manager.getTreeRepository(Category).findTrees({
    relations: ['sites'],
  })

  // automatically joins the sites relation
  // eslint-disable-next-line
  const parentsWithRelations = await dataSource.manager.getTreeRepository(Category).findAncestors(childCategory, {
    relations: ['members'],
  })

  // 要加载这样的树，请使用TreeRepository：
  // findTrees- 返回数据库中的所有树及其所有孩子、孩子的孩子等。 还可以 findTrees({ depth: 2 })
  // eslint-disable-next-line
  const trees = await dataSource.manager.getTreeRepository(Category).findTrees()
  // trees将如下：
  // [
  //   {
  //     id: 1,
  //     name: 'a1',
  //     children: [
  //       {
  //         id: 2,
  //         name: 'a11',
  //         children: [
  //           {
  //             id: 4,
  //             name: 'a111',
  //           },
  //           {
  //             id: 5,
  //             name: 'a112',
  //           },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         name: 'a12',
  //       },
  //     ],
  //   }
  // ]

  // findRoots- 根是没有祖先的实体。都找到了。不加载子叶子。
  // eslint-disable-next-line
  const rootCategories = await dataSource.manager.getTreeRepository(Category).findRoots()

  // findDescendants- 获取给定实体的所有孩子（后代）。将它们全部返回到一个平面数组中。
  // eslint-disable-next-line
  const children = await dataSource.manager.getTreeRepository(Category).findDescendants(parentCategory)

  const repository = null
  // findDescendantsTree- 获取给定实体的所有孩子（后代）。在树中返回它们 - 相互嵌套。
  // eslint-disable-next-line
  const childrenTree = await repository.findDescendantsTree(parentCategory)
  // returns all direct subcategories (with its nested categories) of a parentCategory
  // eslint-disable-next-line
  const childrenTreeWithLimitedDepth = await repository.findDescendantsTree(parentCategory, { depth: 2 })

  // createDescendantsQueryBuilder- 创建一个查询构建器，用于获取树中实体的后代。
  // eslint-disable-next-line
  const children1 = await repository
    .createDescendantsQueryBuilder('category', 'categoryClosure', parentCategory)
    .andWhere("category.type = 'secondary'")
    .getMany()

  // countDescendants- 获取实体的后代数量。
  // eslint-disable-next-line
  const childrenCount = await dataSource.manager.getTreeRepository(Category).countDescendants(parentCategory)

  // findAncestors- 获取给定实体的所有父（祖先）。将它们全部返回到一个平面数组中。
  // eslint-disable-next-line
  const parents = await repository.findAncestors(childCategory)

  // findAncestorsTree- 获取给定实体的所有父（祖先）。在树中返回它们 - 相互嵌套。
  // eslint-disable-next-line
  const parentsTree = await dataSource.manager.getTreeRepository(Category).findAncestorsTree(childCategory)

  // createAncestorsQueryBuilder- 创建一个查询构建器，用于获取树中实体的祖先。
  // eslint-disable-next-line
  const parents1 = await repository
    .createAncestorsQueryBuilder('category', 'categoryClosure', childCategory)
    .andWhere("category.type = 'secondary'")
    .getMany()

  // countAncestors- 获取实体的祖先数量。
  // eslint-disable-next-line
  const parentsCount = await dataSource.manager.getTreeRepository(Category).countAncestors(childCategory)
}
