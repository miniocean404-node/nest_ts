import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'

// 多对一/一对多是一种关系，其中 A 包含 B 的多个实例，但 B 仅包含 A 的一个实例。我们以User实体Photo为例。用户可以拥有多张照片，但每张照片仅归一个用户所有。
// @JoinColumn您可以在@ManyToOne/@OneToMany关系 中省略(因为是双向外键)
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[]
}

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @ManyToOne(() => User, (user) => user.photos)
  user: User
}

const saveManyOne = async () => {
  const dataSource = null

  const photo1 = new Photo()
  photo1.url = 'me.jpg'
  await dataSource.manager.save(photo1)

  const photo2 = new Photo()
  photo2.url = 'me-and-bears.jpg'
  await dataSource.manager.save(photo2)

  const user = new User()
  user.name = 'John'
  user.photos = [photo1, photo2]
  await dataSource.manager.save(user)

  // 启用级联后，您只需一次save调用即可保存此关系。getRepository 中可以是 User 也可以是 Photo
  const userRepository = dataSource.getRepository(User)
  const users = await userRepository.find({
    relations: {
      photos: true,
    },
  })
  const photoRepository = dataSource.getRepository(Photo)
  const photos = await photoRepository.find({
    relations: {
      user: true,
    },
  })

  // 或者使用QueryBuilder你可以加入他们：
  const users1 = await dataSource
    .getRepository(User)
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.photos', 'photo')
    .getMany()

  const photos1 = await dataSource
    .getRepository(Photo)
    .createQueryBuilder('photo')
    .leftJoinAndSelect('photo.user', 'user')
    .getMany()
}
