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

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne((type) => Category, (category) => category.children)
  parent: Category

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[]
}
