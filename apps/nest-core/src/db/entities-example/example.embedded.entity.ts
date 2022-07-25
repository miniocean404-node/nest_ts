// 嵌入式实体
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

export class Name {
  @Column()
  first: string

  @Column()
  last: string
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string

  // 将 Name 嵌入 User 表中
  @Column(() => Name)
  name: Name

  @Column()
  isActive: boolean
}
