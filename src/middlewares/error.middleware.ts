import type { Request, Response, NextFunction } from 'express';

class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 500,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      details: err.details ?? {},
    })
  }

  console.error(`[UNHANDLED ERROR] ${err.message}`)
  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Error interno del servidor',
    details: {},
  })
}

export = { AppError, errorHandler };
