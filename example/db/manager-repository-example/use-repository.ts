import { User } from './entity/User'

const useRepository = async () => {
  const dataSource = null

  const userRepository = dataSource.getRepository(User)
  const user = await userRepository.findOneBy({
    id: 1,
  })

  user.name = 'name'
  await userRepository.save(user)
}
