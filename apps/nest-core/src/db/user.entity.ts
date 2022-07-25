import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

// mysql / 的列类型mariadb
// bit, int, integer, tinyint, smallint, mediumint, bigint, float, double, double precision, dec, decimal, numeric, fixed, bool, boolean, date, datetime, timestamp, time, year,
// char, nchar, national char, varchar, nvarchar, national varchar, , text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, enum, set, json, binary,
// varbinary, geometry, point, linestring, polygon, multipoint, multilinestring, multipolygongeometrycollection

// 用于装饰整个类，使其变成一个数据库表
@Entity('user', { database: 'user' })
export class UserEntity {
  // @PrimaryColumn() 它采用任何类型的任何值。您可以指定列类型。如果您不指定列类型，它将从属性类型中推断出来。int下面的示例将使用您必须在保存之前手动分配的类型创建 id 。
  // @PrimaryGeneratedColumn() 创建一个主列，其值将使用自动递增值自动生成。它将使用/ / /创建int列（取决于提供的数据库和配置）。您不必在保存之前手动分配其值 - 值将自动生成。auto-incrementserialsequenceidentity
  // @PrimaryGeneratedColumn("uuid") 创建一个主列，其值将自动生成uuid。Uuid 是一个唯一的字符串 id。您不必在保存之前手动分配其值 - 值将自动生成。
  // 也可以有两个主列 @PrimaryColumn()

  // @CreateDateColumn是自动设置为实体的插入日期的特殊列。您不需要设置此列 - 它将自动设置。
  // @UpdateDateColumn是一个特殊的列，每次调用save实体管理器或存储库时都会自动设置为实体的更新时间。您不需要设置此列 - 它将自动设置。
  // @DeleteDateColumn是一个特殊的列，每次调用实体管理器或存储库的软删除时都会自动设置为实体的删除时间。您不需要设置此列 - 它将自动设置。如果设置了@DeleteDateColumn，则默认范围将是“未删除”。
  // @VersionColumn是一个特殊的列，每次调用save实体管理器或存储库时都会自动设置为实体的版本（增量号）。您不需要设置此列 - 它将自动设置。
  @PrimaryGeneratedColumn('uuid')
  id?: number

  @Generated('uuid')
  uuid: string

  @Column('bigint', { default: null })
  mobile?: number

  @Column('varchar', { default: null, length: 255 })
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
