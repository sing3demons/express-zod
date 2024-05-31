import express, { Router } from 'express'
import { IRoute, MyRouter, TypeRoute } from '../route.js'
import Logger, { LoggerType } from '../logger.js'
import Context from '../context.js'

const app = express()
const port = 3002

app.use(Context.Ctx)
const myRoute: IRoute = new TypeRoute()

class ExampleRoute {
  constructor(private readonly route: IRoute = new TypeRoute()) {
    console.log('ExampleRoute')
  }

  register(): Router {
    const exampleController = new ExampleController(this.route)
    return new MyRouter().Register(exampleController).instance
  }
}

class ExampleController {
  constructor(private readonly route: IRoute, private readonly logger: LoggerType = new Logger()) {
    console.log('ExampleController')
  }

  get = this.route.get('/').handler(async ({}) => {
    console.log('Hello World')
    const logger = this.logger.Logger()
    logger.info('Hello World', { data: 'Hello World' })
    return {
      message: 'Hello World',
    }
  })
}

app.use('/', new ExampleRoute(myRoute).register())
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
