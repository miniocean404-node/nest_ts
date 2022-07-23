import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeLevelColumn,
  TreeParent,
} from 'typeorm'

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  // enum列类型
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role: UserRole

  // set列类型
  @Column({
    type: 'set',
    enum: UserRole,
    default: [UserRole.GHOST, UserRole.EDITOR],
  })
  roles: UserRole[]

  // simple-array列类型
  // 您编写的值中不得有任何逗号。
  @Column('simple-array')
  names: string[]

  // simple-json列类型
  // const user = new User() user.profile = { name: "John", nickname: "Malkovich" }
  // 将作为值存储在单个数据库列中{"name":"John","nickname":"Malkovich"}。当您从数据库加载数据时，您将通过 JSON.parse 返回您的对象/数组/原语
  @Column('simple-json')
  profile: { name: string; nickname: string }

  @Column({
    //   ColumnType- 列类型。上面列出的类型之一。
    type: 'varchar',
    // string- 数据库表中的列名。默认情况下，列名是从属性名生成的。您可以通过指定自己的名称来更改它。
    name: '',
    // number- 列类型的长度。例如，如果要创建varchar(150)类型，则指定列类型和长度选项。
    length: 150,
    //  number- 列类型的显示宽度。仅用于MySQL 整数类型
    width: 200,
    //  string-ON UPDATE触发。仅在MySQL中使用。
    onUpdate: '',
    nullable: false, //  boolean- 使列NULL或NOT NULL在数据库中。默认情况下，列是nullable: false.
    update: false, // 则只有在第一次插入对象时才能写入此值。默认值为true。, boolean- 指示列值是否由“保存”操作更新。如果为 false，则只有在第一次插入对象时才能写入此值。默认值为true。
    insert: true, //  boolean- 指示是否在您第一次插入对象时设置列值。默认值为true。
    select: true, // boolean- 定义查询时是否默认隐藏该列。当设置为false时，列数据将不会在标准查询中显示。默认列是select: true
    default: '', //  string- 添加数据库级列的DEFAULT值。
    primary: true, // boolean- 将列标记为主要列。如果您使用@PrimaryColumn.
    unique: true, // boolean- 将列标记为唯一列（创建唯一约束）。
    comment: '', // string-   数据库的列注释。并非所有数据库类型都支持。
    precision: 1, //  number- 小数（精确数字）列的精度（仅适用于小数列），即为值存储的最大位数。在某些列类型中使用。
    scale: 1, // number- 小数（精确数字）列的比例（仅适用于小数列），表示小数点右侧的位数，不得大于精度。在某些列类型中使用。
    zerofill: false, // boolean- 将ZEROFILL属性放在数字列上。仅在 MySQL 中使用。如果true是，MySQL 会自动将UNSIGNED属性添加到该列。
    unsigned: false, // boolean- 将UNSIGNED属性放在数字列上。仅在 MySQL 中使用。
    charset: '', // string- 定义列字符集。并非所有数据库类型都支持。
    collation: '', // string- 定义列排序规则。
    enum: [''], // string[]|AnyEnum- 用于enum列类型以指定允许的枚举值列表。您可以指定值数组或指定枚举类。
    enumName: '', // string- 定义所用枚举的名称。
    asExpression: '', // string- 生成的列表达式。仅在MySQL中使用。
    generatedType: 'STORED', // "VIRTUAL"|"STORED"- 生成的列类型。仅在MySQL中使用。
    hstoreType: 'string', // "object"|"string"- 列的返回类型HSTORE。以字符串或对象的形式返回值。仅在Postgres中使用。
    array: false, // boolean- 用于可以是数组的 postgres 和 cockroachdb 列类型（例如 int[]）
    // transformer: '', // { from(value:,// DatabaseType):,// EntityType, to(value:,// EntityType):,// DatabaseType }- 用于将任意类型的属性编组为数据库支持的EntityType类型。DatabaseType还支持转换器数组，并且在写入时以自然顺序应用，在读取时以相反顺序应用。例如[lowercase, encrypt]，将首先小写字符串，然后在写入时对其进行加密，然后在读取时解密然后不执行任何操作。
  })
  name: string
}

// 实体继承
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

@Entity()
export class Question extends Content {
  @Column()
  answersCount: number
}

@Entity()
export class Post extends Content {
  @Column()
  viewCount: number
}

// 邻接表
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // 嵌入式实体
  @Column(() => Post)
  merge: Post

  @Column()
  description: string

  @ManyToOne((type) => Category, (category) => category.children)
  parent: Category

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[]
}

// #闭包表
@Entity()
@Tree('closure-table')
export class Category1 {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @TreeChildren()
  children: Category[]

  @TreeParent()
  parent: Category

  @TreeLevelColumn()
  level: number
}
