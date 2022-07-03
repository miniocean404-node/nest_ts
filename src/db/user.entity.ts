import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// 用于装饰整个类，使其变成一个数据库模型
@Entity()
export class UserEntity {
  // 则是装饰主列，它的值将自动生成
  @PrimaryGeneratedColumn()
  id?: number

  //于装饰类的某个属性，使其对应于数据库表中的一列，可提供一系列选项参数
  @Column()
  name?: string

  //password 设置了 select: false ，使得这个字段在查询时默认不被选中
  @Column({ select: false })
  password?: string

  @Column()
  email?: string

  @Column({ length: 50 })
  title: string

  @Column('text')
  content: string

  @Column('tinyint')
  type: number

  @Column({ default: '' })
  thumb_url: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date
}
