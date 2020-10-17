import { NextFunction, Request, Response } from 'express'
import { AnySchema } from 'joi'

export interface IJoiSchema extends AnySchema {
  _ids: {
    _byId: Map<string, AnySchema>
    _byKey: Map<string, AnySchema>
  }
}

export type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void

export class RouteSchemaValidator {
  static validate(schema: IJoiSchema): MiddlewareFunction {
    return (req, res, next) => {
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
