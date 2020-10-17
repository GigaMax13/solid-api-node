import { config } from 'dotenv'

config()

let path

switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`
    break
  case 'production':
    path = `${__dirname}/../../.env.production`
    break
  default:
    path = `${__dirname}/../../.env.development`
}

config({ path })

/*
  TODO
  find a better way to destruct the env object and export its value
 */

export const {
  env: { BODY_LIMIT, PORT, MAILTRAP_USER, MAILTRAP_PASS }
} = process
