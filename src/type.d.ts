type IRoute = TypeRoute

interface BaseResponse<T = unknown> {
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

type MaybePromise<T> = T | Promise<T>

type RequestHandler = (req: Request, res: Response, next: NextFunction) => MaybePromise<BaseResponse>

interface HandlerMetadata {
  __handlerMetadata: true
  method: string
  path: string
  handler: RequestHandler
}
