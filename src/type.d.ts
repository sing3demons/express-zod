import { TypeRoute } from './route.js'
import { Router, type NextFunction, type Request, type Response } from 'express'

export type IRoute = TypeRoute

export interface BaseResponse<T = unknown> {
  statusCode?: number
  message?: string
  /**
   * @default true
   */
  success?: boolean
  data?: T
  traceStack?: string
  page?: number
  pageSize?: number
  total?: number
}

export type MaybePromise<T> = T | Promise<T>

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => MaybePromise<BaseResponse>

export interface HandlerMetadata {
  __handlerMetadata: true
  method: string
  path: string
  handler: RequestHandler
}
