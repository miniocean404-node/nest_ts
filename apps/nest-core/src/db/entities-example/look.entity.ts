import { ViewEntity, ViewColumn } from 'typeorm'

/*
    @ViewEntity()接受以下选项：

    name- 查看名称。如果未指定，则从实体类名称生成视图名称。
    database- 选定数据库服务器中的数据库名称。
    schema- 模式名称。
    expression- 查看定义。必需参数。 注意：由于驱动程序限制，不支持参数绑定。请改用文字参数。
    dependsOn- 当前视图所依赖的其他视图列表。如果您的视图在其定义中使用了另一个视图，您可以在此处添加它，以便以正确的顺序生成迁移。
*/
@ViewEntity({
  expression: `
        SELECT "post"."id" AS "id", "post"."name" AS "name", "category"."name" AS "categoryName"
        FROM "post" "post"
        LEFT JOIN "category" "category" ON "post"."categoryId" = "category"."id"
    `,
  /*
    使用 QueryBuilder 的示例：
     expression: (dataSource: DataSource) =>
       dataSource
         .createQueryBuilder()
         .select('post.id', 'id')
         .addSelect('post.name', 'name')
         .addSelect('category.name', 'categoryName')
         .from(Post, 'post')
         .leftJoin(Category, 'category', 'category.id = post.categoryId'),
  */
})
export class PostCategory {
  @ViewColumn()
  id: number

  @ViewColumn()
  name: string

  @ViewColumn()
  categoryName: string
}
