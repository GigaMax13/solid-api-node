import { v4 } from 'uuid'

export interface IUserDTO {
  email: string
  name: string
  pass: string
}

export class User {
  public readonly id: string

  public email: string
  public name: string
  public pass: string

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)

    if (!id) {
      this.id = v4()
    }
  }
}
