import type { Router } from 'express'
import {  MyRouter } from '../route.js'
import { IRoute } from '../type.js'

export class ExampleRoute {
  constructor(private readonly route: IRoute) {}

  register(): Router {
    return new MyRouter().Register(this.route).instance
  }
}
