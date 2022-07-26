import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm'

// 多对多是一种关系，其中 A 包含 B 的多个实例，B 包含 A 的多个实例。我们以Question实体Category为例。一个问题可以有多个类别，每个类别可以有多个问题。
// @JoinTable()是@ManyToMany关系所必需的。你必须@JoinTable站在关系的一方（拥有）一方。
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  questions: any

  @Column()
  postToCategories: any
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]
}

const saveMnayToMany = async () => {
  const dataSource = null

  // 启用级联后，您只需一次save调用即可保存此关系。
  const category1 = new Category()
  category1.name = 'animals'
  await dataSource.manager.save(category1)

  const category2 = new Category()
  category2.name = 'zoo'
  await dataSource.manager.save(category2)

  const question = new Question()
  question.title = 'dogs'
  question.text = 'who let the dogs out?'
  question.categories = [category1, category2]
  await dataSource.manager.save(question)
}

//在此示例中，我们没有为 category1 和 category2 调用 save 或 softRemove，但是当关系选项的级联设置为 true 时，它​​们将自动保存和软删除，如下所示：
const deleteManyToMany = async () => {
  const dataSource = null
  const categoryToRemove = { id: 1 }

  // 要删除两条记录之间的多对多关系，请将其从相应字段中删除并保存记录。
  // 这只会删除连接表中的记录。和记录question仍将categoryToRemove存在。
  const question = dataSource.getRepository(Question)
  question.categories = question.categories.filter((category) => {
    return category.id !== categoryToRemove.id
  })
  await dataSource.manager.save(question)
}

const deleteAndCascade = async () => {
  const dataSource = null
  const category1 = new Category()
  category1.name = 'animals'

  const category2 = new Category()
  category2.name = 'zoo'

  const question = new Question()
  question.categories = [category1, category2]
  const newQuestion = await dataSource.manager.save(question)

  await dataSource.manager.softRemove(newQuestion)
}

@Entity()
export class Question1 {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(() => Category, (category) => category.questions, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[]
}

const loadManyToMany = async () => {
  const dataSource = null

  const questionRepository = dataSource.getRepository(Question)
  const questions = await questionRepository.find({
    relations: {
      categories: true,
    },
  })

  // 在关系上启用预加载后，您不必在 find 命令中指定关系，因为它总是会自动加载。如果您使用 QueryBuilder 急切关系被禁用，您必须使用leftJoinAndSelect来加载关系。
  const questions1 = await dataSource
    .getRepository(Question)
    .createQueryBuilder('question')
    .leftJoinAndSelect('question.categories', 'category')
    .getMany()
}

@Entity()
export class Category3 {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany(() => Question3, (question) => question.categories)
  questions: Question3[]
}

@Entity()
export class Question3 {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @ManyToMany(() => Category3, (category) => category.questions)
  @JoinTable()
  categories: Category3[]
}

// 我们只是让我们的关系是双向的。请注意，逆关系没有@JoinTable. @JoinTable必须只在关系的一侧。
const doubleRelation = async () => {
  const dataSource = null

  const categoriesWithQuestions = await dataSource
    .getRepository(Category)
    .createQueryBuilder('category')
    .leftJoinAndSelect('category.questions', 'question')
    .getMany()

  // 双向关系允许您使用以下方式连接双方的关系QueryBuilder：
  const categoriesWithQuestions1 = await dataSource
    .getRepository(Category)
    .createQueryBuilder('category')
    .leftJoinAndSelect('category.questions', 'question')
    .getMany()
}

// 与自定义属性的多对多关系
// 如果您需要在多对多关系中具有其他属性，则必须自己创建一个新实体。
// 例如，如果您想要实体Post并Category与附加列具有多对多关系order，那么您需要创建一个PostToCategory具有两个ManyToOne指向两个方向的关系并在其中包含自定义列的实体：

// 您必须将如下关系添加到Post and Category：

// category.ts
/*
  ...
  @OneToMany(() => PostToCategory, postToCategory => postToCategory.category)
  public postToCategories!: PostToCategory[];

  post.ts
  ...
  @OneToMany(() => PostToCategory, postToCategory => postToCategory.post)
  public postToCategories!: PostToCategory[];
*/

class Post {
  @Column()
  postToCategories: any
}

@Entity()
export class PostToCategory {
  @PrimaryGeneratedColumn()
  public postToCategoryId!: number

  @Column()
  public postId!: number

  @Column()
  public categoryId!: number

  @Column()
  public order!: number

  @ManyToOne(() => Post, (post) => post.postToCategories)
  public post!: Post

  @ManyToOne(() => Category, (category) => category.postToCategories)
  public category!: Category
}
