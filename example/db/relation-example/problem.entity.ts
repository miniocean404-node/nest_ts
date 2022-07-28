import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'

// 自指关系是与自身有关系的关系。当您将实体存储在树状结构中时，这很有用。“邻接列表”模式也是使用自引用关系实现的。
// 例如，您想在应用程序中创建类别树。类别可以嵌套类别，嵌套类别可以嵌套其他类别等。自引用关系在这里派上用场。基本上自引用关系只是针对实体本身的常规关系
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @ManyToOne((type) => Category, (category) => category.childCategories)
  parentCategory: Category

  @OneToMany((type) => Category, (category) => category.parentCategory)
  childCategories: Category[]
}
