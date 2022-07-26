import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'

// 一对一是一种关系，其中 A 仅包含 B 的一个实例，而 B 仅包含 A 的一个实例。我们以User实体Profile为例。用户只能拥有一个配置文件，并且一个配置文件仅由单个用户拥有。
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  gender: string

  @Column()
  photo: string
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToOne(() => Profile)
  // 在这里，我们添加@OneToOne了profile并指定目标关系类型为Profile。我们还添加了@JoinColumn它是必需的，并且只能在关系的一侧设置。
  // 您设置@JoinColumn的那一侧，那一侧的表将包含一个“关系 id”和目标实体表的外键。(这个实体这个值有个外键链接另一个表)
  @JoinColumn()
  profile: Profile
}

// eslint-disable-next-line
const saveOneToOne = async () => {
  const dataSource = null

  const profile = new Profile()
  profile.gender = 'male'
  profile.photo = 'me.jpg'
  await dataSource.manager.save(profile)

  const user = new User()
  user.name = 'Joe Smith'
  user.profile = profile
  await dataSource.manager.save(user)

  // 启用级联后，您只需一次save调用即可保存此关系。
  // 要在内部加载用户配置文件，您必须指定关系FindOptions：
  const users = await dataSource.getRepository(User).find({
    relations: {
      profile: true,
    },
  })

  // 或者使用QueryBuilder你可以加入他们：
  // 在关系上启用预加载后，您不必在 find 命令中指定关系，因为它总是会自动加载。如果您使用 QueryBuilder 急切关系被禁用，您必须使用leftJoinAndSelect来加载关系。
  const users1 = await dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.profile', 'profile')
    .getMany()
}

@Entity()
export class DoubleProfile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  gender: string

  @Column()
  photo: string

  @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
  user: User
}

@Entity()
export class DoubleUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToOne(() => DoubleProfile, (profile) => profile.user) // specify inverse side as a second parameter
  @JoinColumn()
  profile: DoubleProfile
}

// 双向关系允许您使用以下方式连接双方的关系QueryBuilder：
const saveDoubleOneToOne = async () => {
  const dataSource = null

  const profiles = await dataSource
    .getRepository(Profile)
    .createQueryBuilder('profile')
    .leftJoinAndSelect('profile.user', 'user')
    .getMany()
}
