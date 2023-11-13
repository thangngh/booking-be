import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from 'express';
import { User } from "models/user/entities/user.entity";

export const ReqUser = createParamDecorator((data: keyof User, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;
    return data ? user && user[data] : user;
})

