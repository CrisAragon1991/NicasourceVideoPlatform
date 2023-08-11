import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import { Routes } from './routes'
import { handleError } from './utilities/handle-error'

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express()
    app.use(morgan('combined'))
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach((route: any) => {
        (app as any)[route.method](
        route.route,
        ...route.middlewares,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)(...route.dependencies)[route.action](
              req,
              res,
              next
            )
            return result
          } catch (error) {
            next(error)
          }
        }
        )
    })
    // setup express app here
    // ...
    app.use(handleError)
    
    // start express server
    app.listen(process.env.API_PORT)

    console.log(
      `Express server has started on port ${process.env.API_PORT}. Open http://localhost:${process.env.API_PORT}/users to see results`
    )
  })
  .catch((error) => console.log(`Global Error`,error))
