import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Request } from 'express'
@Injectable()
export class LocalGuard extends AuthGuard('local') implements CanActivate {


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        this.extractTokenFromHeaderCookie(request)


        return true;
    }

    private extractTokenFromHeaderCookie(request: Request): string | undefined {
        const [type, token] = request.cookies('refreshToken')

        console.log("cookie", token, type)

        return type === 'Bearer' ? token : undefined;
    }
}
