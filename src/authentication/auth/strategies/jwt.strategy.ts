import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import 'dotenv/config';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interface/auth.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: IJwtPayload) {
		return await this.authService.verifyJwtPayload(payload);
	}
}