import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const rawHeaders = request.headers;

    if (!rawHeaders)
      throw new InternalServerErrorException('User not found (request)');

    return rawHeaders;
  },
);
