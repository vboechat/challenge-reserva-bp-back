import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { UserPayloadEntity } from "../types/payload.type";

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayloadEntity => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as UserPayloadEntity;
  },
);
