import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUserDTO, User } from '../../entities/User'
import { IMailProvider } from '../../providers/IMailProvider'

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: IUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error('User already exists.')
    }

    const user = new User(data)

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'My App Team',
        email: 'team@myapp.com'
      },
      subject: 'Welcome \\o/',
      body: `
        <p>
            <b>Be welcome!</b><br><br>
            You can now login to our platform
        </p>
      `
    })
  }
}
