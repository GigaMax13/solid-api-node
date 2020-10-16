import joi from 'joi'
import { NextFunction, Request, Response } from 'express'

export class RouteSchemaValidator {
  static validate(
    schema: joi.Schema
  ): (req: Request, res: Response, next: NextFunction) => void {
    return (req, res, next) => {
      /*
        TODO
        find a better way to access the _ids property
       */

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = [...schema._ids._byKey.keys()]
        .map(key => ({
          [key]: req[key]
        }))
        .reduce((current, total) => ({
          ...current,
          ...total
        }))

      const validation = schema.validate(data)
      const { error } = validation

      if (!error) {
        next()
      } else {
        const { details } = error

        res.status(400).send({
          success: false,
          messages: details.map(({ message, path }) => ({
            message: message.replace(/["']/g, ''),
            path
          }))
        })
      }
    }
  }
}
