import { z } from 'zod'
import { IRoute } from '../route'

export default class ExampleController {
  constructor(private readonly route: IRoute) {}

  get = this.route
    .get('/example')
    .query(z.object({ name: z.string().optional() }))
    .handler(async ({ query }) => {
      console.log(query)
      return {
        data: 'Hello World',
      }
    })
}
