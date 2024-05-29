import express, { Router } from 'express'
import { IRoute, MyRouter, TypeRoute } from '../index.js'

const app = express()
const port = 3002

const myRoute: IRoute = new TypeRoute()

class ExampleRoute {
  constructor(private readonly route: IRoute = new TypeRoute()) {}

  register(): Router {
    const exampleController = new ExampleController(this.route)
    return new MyRouter().Register(exampleController).instance
  }
}

class ExampleController {
  constructor(private readonly route: IRoute) {}

  get = this.route.get('/').handler(async ({}) => {
    return {
      message: 'Hello World',
    }
  })
}

app.use('/', new ExampleRoute(myRoute).register())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
