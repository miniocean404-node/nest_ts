import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany((type) => Question, (question) => question.categories)
  questions: Question[]
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @ManyToMany((type) => Category, (category) => category.questions, {
    eager: true,
  })
  @JoinTable()
  categories: Category[]
}

// 急切的关系仅在您使用find*方法时才有效。
// 如果您使用QueryBuilder急切的关系被禁用并且必须使用leftJoinAndSelect来加载关系。
// 急切关系只能用于关系的一侧，eager: true不允许在关系的两侧使用。
const loadRelation = async () => {
  const dataSource = null

  const questionRepository = dataSource.getRepository(Question)

  // 当您加载时，您无需加入或指定要加载的关系。它们将自动加载
  const questions = await questionRepository.find()
}

// 惰性关系

@Entity()
export class Category1 {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany((type) => Question1, (question) => question.categories)
  questions: Promise<Question[]>
}

@Entity()
export class Question1 {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @ManyToMany((type) => Category1, (category) => category.questions)
  @JoinTable()
  categories: Promise<Category1[]>
}

const lazyLoad = async () => {
  const dataSource = null

  const category1 = new Category1()
  category1.name = 'animals'
  await dataSource.manager.save(category1)

  const category2 = new Category1()
  category2.name = 'zoo'
  await dataSource.manager.save(category2)

  const question = new Question1()
  question.categories = Promise.resolve([category1, category2])
  await dataSource.manager.save(question)

  // 示例如何在惰性关系中加载对象：
  const [question1] = await dataSource.getRepository(Question).find()
  const categories = await question.categories
}
