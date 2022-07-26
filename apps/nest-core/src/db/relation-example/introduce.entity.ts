import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

/*
您可以为关系指定几个选项：

    eager: boole *- 如果设置为 true，则在使用方法或QueryBuilder在此实体上时，关系将始终与主实体一起加载
    cascade: boolean | ("insert" | "update" | "remove" | "soft-remove" | "recover")[]- 如果设置为 true，相关对象将在数据库中插入和更新。您还可以指定一系列级联选项。
    onDelete: "RESTRICT"|"CASCADE"|"SET NULL"- 指定删除引用对象时外键的行为方式
    nullable: boolean- 指示此关系的列是否可以为空。默认情况下它可以为空。
    orphanedRowAction: "nullify" | "delete" | "soft-delete" - 当子行从其父行中删除时，确定子行应该是孤立的（默认）还是删除（删除或软删除）。
 */

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @ManyToMany((type) => Category, (category) => category.questions, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[]
}

// 级联
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany((type) => Question, (question) => question.categories)
  questions: Question[]
}

// save正如您在此示例中看到的那样，我们没有调用category1and category2。它们将被自动插入，因为我们设置cascade为 true。
// 请记住——强大的力量伴随着巨大的责任。级联似乎是一种处理关系的好方法和简单的方法，但是当一些不需要的对象被保存到数据库中时，它们也可能带来错误和安全问题。此外，它们提供了一种不太明确的方式将新对象保存到数据库中
const useCascade = async () => {
  const dataSource = null

  const category1 = new Category()
  category1.name = 'ORMs'

  const category2 = new Category()
  category2.name = 'Programming'

  const question = new Question()
  question.title = 'How to ask questions?'
  question.text = 'Where can I ask TypeORM-related questions?'
  question.categories = [category1, category2]
  await dataSource.manager.save(question)
}

/*
  @JoinColumn选项
*/
class JoinColumnExample {
  /*
    @ManyToOne((type) => Category)
    @ManyToOne 是可选的, @OneToOne 是必须的
    此代码将在数据库中创建一个categoryId列。如果要在数据库中更改此名称，可以指定自定义连接列名称：@JoinColumn({ name: "cat_id" })
    连接列始终是对其他一些列的引用（使用外键）。默认情况下，您的关系始终引用相关实体的主列。如果您想与相关实体的其他列创建关系 - 您也可以指定它们@JoinColumn： @JoinColumn({ referencedColumnName: "name" })
    您还可以连接多个列。请注意，默认情况下它们不引用相关实体的主列：您必须提供引用的列名称。
    @JoinColumn([
        { name: 'category_id', referencedColumnName: 'id' },
        { name: 'locale_id', referencedColumnName: 'locale_id' },
    ])
    当我们设置@JoinColumn时，它会自动在数据库中创建一个名为propertyName + referencedColumnName. 例如：
  */
  @JoinColumn()
  category: Category
}

/*
  @JoinTable选项
  @JoinTable 用于many-to-many关系并描述“连接”表的连接列。联结表是由 TypeORM 自动创建的特殊单独表，其中包含引用相关实体的列。您可以更改联结表中的列名及其引用的列
  @JoinColumn：您还可以更改生成的“联结”表的名称。
*/
class JoinTableExample {
  @ManyToMany((type) => Category)
  @JoinTable({
    name: 'question_categories', // table name for the junction table of this relation
    joinColumn: {
      name: 'question',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
  })
  categories: Category[]
}
