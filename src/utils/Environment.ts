import { config } from 'dotenv'

config()

/*
  TODO
  find a better way to destruct the env object and export its value
 */

export const {
  env: { BODY_LIMIT, PORT, MAILTRAP_USER, MAILTRAP_PASS }
} = process
