import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const duration = Date.now() - start;
      console.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`
      )
      this.logger.log( `${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });

    next();
  }
}
