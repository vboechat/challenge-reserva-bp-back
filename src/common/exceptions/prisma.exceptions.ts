import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Prisma } from "@prisma/client";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case "P1001": {
        const status = HttpStatus.SERVICE_UNAVAILABLE;

        response.status(status).json({
          statusCode: status,
          message: "DB unavailable",
        });

        break;
      }
      case "P2002": {
        const status = HttpStatus.CONFLICT;

        response.status(status).json({
          statusCode: status,
          message: "Conflict",
        });

        break;
      }
      case "P2003": {
        const status = HttpStatus.NOT_FOUND;

        response.status(status).json({
          statusCode: status,
          message: "Not found",
        });

        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }
}
