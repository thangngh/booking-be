import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt_refresh')
// implements CanActivate
{
    constructor() {
        super();
    }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const request = context.switchToHttp().getRequest();

    //     const token = 
    //     console.log("request cookie", request.cookies)

    //     return true;
    // }
}