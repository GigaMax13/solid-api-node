interface IAddress {
  email: string
  name: string
}

export interface IMessage {
  from: IAddress
  to: IAddress
  subject: string
  body: string
}

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>
}
