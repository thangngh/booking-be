import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ILogin } from "../interface/auth.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super();
	}

	// async validate(body: ILogin): Promise<any> {
	// 	const { username, password } = body;
	// 	const user = await this.authService.validateUser({ username, password });
	// 	if (!user) {
	// 		throw new UnauthorizedException();
	// 	}
	// 	return user;
	// }
}

