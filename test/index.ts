import * as express from 'express'
import { Request, Response } from 'express'
const app = express()
app.use(express.json())
export const routeRegister = (Routes: any[], app) => {
    Routes.forEach((route) => {
        (app as any)[route.method](
        route.route,
        // eslint-disable-next-line @typescript-eslint/ban-types
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)(...route.dependencies)[route.action](
              req,
              res,
              next
            )
            res.json(result)
          } catch (error) {
            next(error)
          }
        }
      )
    })
} 
export default app