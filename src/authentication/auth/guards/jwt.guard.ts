import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        return super.canActivate(context);
    }
    // constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
    //     super();
    // }

    // async canActivate(context: ExecutionContext): Promise<boolean> {

    //     const request = context.switchToHttp().getRequest();

    //     const token = this.extractTokenFromHeader(request);
    //     if (!token) {
    //         throw new UnauthorizedException();
    //     }

    //     try {
    //         const payload = await this.jwtService.verifyAsync(
    //             token,
    //             {
    //                 secret: this.configService.get<string>("JWT_SECRET")
    //             }
    //         );

    //         console.log("user payload", payload);
    //         // 💡 We're assigning the payload to the request object here
    //         // so that we can access it in our route handlers
    //         request['user'] = payload;
    //     } catch {
    //         throw new UnauthorizedException();
    //     }
    //     return true;
    // }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
