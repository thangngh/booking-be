import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetCookie = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return data ? request.cookies?.[data] : request.cookies;
    },
);