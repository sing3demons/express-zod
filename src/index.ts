import express from 'express'
import { ExampleRoute } from './example/example.route.js'
import { TypeRoute } from './route.js'

const app = express()
const port = 3000
const myRoute: IRoute = new TypeRoute()

app.use('/', new ExampleRoute(myRoute).register())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
