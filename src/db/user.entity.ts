import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// 用于装饰整个类，使其变成一个数据库模型
@Entity('user')
export class UserEntity {
  // 则是装饰主列，它的值将自动生成
  @PrimaryGeneratedColumn()
  id?: number

  @Column('bigint', { default: null })
  mobile?: number

  @Column('varchar', { default: null })
  username?: string

  @Column('varchar', { default: null })
  password?: string

  @Column('varchar', { default: null })
  encryptPassword?: string

  // 于装饰类的某个属性，使其对应于数据库表中的一列，可提供一系列选项参数
  // 设置了 select: false ，使得这个字段在查询时 不在查询结果中
  @Column({ default: null })
  salt?: string

  // 于装饰类的某个属性，使其对应于数据库表中的一列，可提供一系列选项参数
  // 设置了 select: false ，使得这个字段在查询时默认不被选中
  @Column({ select: false, default: null })
  email?: string

  @Column({ length: 50, default: null })
  title: string

  @Column('text', { default: null })
  content: string

  @Column('tinyint', { default: null })
  type: number

  @Column({ default: '' })
  thumb_url: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date
}
