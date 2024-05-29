import type { Router } from 'express'
import { IRoute, MyRouter, TypeRoute } from '../route.js'
import ExampleController from './example.controller.js'

export class ExampleRoute {
  constructor(private readonly route: IRoute = new TypeRoute()) {}

  register(): Router {
    const exampleController = new ExampleController(this.route)
    return new MyRouter().Register(exampleController).instance
  }
}
