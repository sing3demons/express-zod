import express from 'express'
import { ExampleRoute } from './example/example.route.js'
import { IRoute, TypeRoute } from './route.js'

const app = express()
const port = 3002

const myRoute: IRoute = new TypeRoute()
app.use('/', new ExampleRoute(myRoute).register())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
