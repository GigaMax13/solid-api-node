import sinon from 'sinon'

import { IMessage, IMailProvider } from '../../providers/IMailProvider'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUserDTO, User } from '../../entities/User'
import { CreateUserUseCase } from './CreateUserUseCase'

class FakeMailProvider implements IMailProvider {
  sendMail(message: IMessage): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (message) {
        resolve()
      } else {
        reject(new Error('No message'))
      }
    })
  }
}

class FakeUsersRepository implements IUsersRepository {
  constructor(private users: User[] = []) {}

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save(user: User): Promise<void> {
    return Promise.resolve()
  }
}

describe('CreateUserUseCase', () => {
  const fakeUser: IUserDTO = {
    email: 'fake_user@test.com',
    name: 'Sr. Fake User',
    pass: '########'
  }
  let createUserUseCase: CreateUserUseCase

  beforeEach(() => {
    createUserUseCase = null
  })

  it('should throw an error when an email is already registered', async () => {
    const userRepository = new FakeUsersRepository([
      {
        email: 'fake_user@test.com',
        name: 'Another User',
        pass: '########',
        id: '001'
      }
    ])
    const mailProvider = new FakeMailProvider()

    createUserUseCase = new CreateUserUseCase(userRepository, mailProvider)

    async function createAnUser() {
      await createUserUseCase.execute(fakeUser)
    }

    await expect(createAnUser()).rejects.toThrowError(
      new Error('User already exists.')
    )
  })

  it('should create a new user', async () => {
    const findByEmail = sinon.spy(FakeUsersRepository.prototype, 'findByEmail')
    const save = sinon.spy(FakeUsersRepository.prototype, 'save')
    const userRepository = new FakeUsersRepository()
    const mailProvider = new FakeMailProvider()

    createUserUseCase = new CreateUserUseCase(userRepository, mailProvider)

    await createUserUseCase.execute(fakeUser)

    expect(findByEmail.callCount).toBe(1)
    expect(findByEmail.calledWith(fakeUser.email)).toBeTruthy()
    expect(save.callCount).toBe(1)
    expect(save.calledWith(sinon.match.instanceOf(User))).toBeTruthy()
  })

  it('should send an email for the new user', async () => {
    const sendMail = sinon.spy(FakeMailProvider.prototype, 'sendMail')
    const userRepository = new FakeUsersRepository()
    const mailProvider = new FakeMailProvider()

    createUserUseCase = new CreateUserUseCase(userRepository, mailProvider)

    await createUserUseCase.execute(fakeUser)

    expect(sendMail.callCount).toBe(1)
    expect(sendMail.calledWith(sinon.match.has('to'))).toBeTruthy()
    expect(sendMail.calledWith(sinon.match.has('from'))).toBeTruthy()
    expect(sendMail.calledWith(sinon.match.has('subject'))).toBeTruthy()
    expect(sendMail.calledWith(sinon.match.has('body'))).toBeTruthy()
  })
})
