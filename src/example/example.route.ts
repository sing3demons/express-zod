import type { Router } from 'express'
import { IRoute, MyRouter } from '../route.js'

export class ExampleRoute {
  constructor(private readonly route: IRoute) {}

  register(): Router {
    return new MyRouter().Register(this.route).instance
  }
}
