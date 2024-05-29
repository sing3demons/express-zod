import type { Request, Response, NextFunction } from 'express'

declare class Context {
  static Ctx(req: Request, res: Response, next: NextFunction): void
  static bind(req: Request): void
  static get(): { session: string } | undefined
  static clear(): void
  static getHeaders(req: Request): { session: string }

  private static _bindings: Map<string, { session: string }>
}
