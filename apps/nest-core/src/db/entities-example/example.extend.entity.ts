import { ChildEntity, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm'

// 实体继承,创建实体抽象类公用、其他实体使用可以继承，以免重复编写
export abstract class Content {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string
}

@Entity()
export class Photo extends Content {
  @Column()
  size: string
}

// 单表继承
// 这将 SingleTablePhoto 表的内容 写入 SingleTableContent 中，以免重复编写
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class SingleTableContent {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string
}

@ChildEntity()
export class SingleTablePhoto extends SingleTableContent {
  @Column()
  size: string
}
