import { HttpException, HttpStatus, Injectable, UnauthorizedException, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'models/user/user.service';
import { IJwtPayload, ILogin, IRegister } from './interface/auth.interface';
import { User } from 'models/user/entities/user.entity';
import { EActive, EProviderType, hashValue, validateHash } from 'common/constants/setting';
import { Response } from 'express';
import { IUpdateRT } from 'models/user/user.interface';
import { ConfigService } from '@nestjs/config';
import { UserRoleService } from 'models/user-role/user-role.service';
import { RoleService } from 'models/role/role.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly userRoleService: UserRoleService,
        private readonly roleService: RoleService,
        private readonly configService: ConfigService
    ) { }

    async login(body: ILogin, @Res() res: Response) {
        const { username, password } = body;

        const findUser = await this.userService.queryUsername({ username })

        if (findUser.length === 0) {
            throw new HttpException('Access Denied !', HttpStatus.BAD_REQUEST);
        }

        const userRp = new User(findUser[0])

        const isMatch = findUser && await validateHash(userRp.password, password);

        if (!isMatch) {
            throw new HttpException('Access Denied !', HttpStatus.BAD_REQUEST);
        }

        if (EActive['ACTIVE'] !== Number(userRp.isActive)) {
            throw new HttpException('The account was locked', HttpStatus.BAD_REQUEST);
        }

        const user = `${userRp.firstName} ${userRp.lastName}`

        const { accessToken, refreshToken } = await this.signToken(userRp.id.toString(), userRp?.username);
        console.log("token", { accessToken, refreshToken })
        await this.userService.saveRefreshToken(userRp?.id, { refreshToken })

        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        res.json({
            statusCode: HttpStatus.OK,
            message: 'Login success !',
            user,
            accessToken
        });
    }

    async refreshToken(id: number, body: IUpdateRT) {
        const { refreshToken } = body;

        const userId = id.toString();

        const user = await this.userService.findUserById(userId)

        const userRp = new User(user[0])
        if (user?.length === 0 || !userRp['refresh_token']) {
            throw new HttpException('Access Denied !', HttpStatus.BAD_REQUEST);
        }

        const isMatch = await validateHash(userRp['refresh_token'], refreshToken);

        if (!isMatch) {
            throw new HttpException('Access Denied !', HttpStatus.BAD_REQUEST);
        }

        const signToken = await this.signToken(userId, userRp?.username)

        await this.userService.saveRefreshToken(id, { refreshToken: signToken.refreshToken })

        return {
            accessToken: signToken.accessToken
        }
    }

    async logout(user: User) {
        const { id } = user
        return await this.refreshToken(id, { refreshToken: null })
    }

    async verifyJwtPayload(payload: IJwtPayload) {
        const { id, username } = payload;

        try {

            const query = await this.userService.findUserWitJwt({ id, username })

            return query;
        } catch (error) {
            throw new UnauthorizedException(`
				Unauthorized access with payload: ${JSON.stringify(payload.username)}
			`)
        }
    }

    async register(body: IRegister) {
        const { username, email, password } = body;

        const validateEmail = await this.userService.queryEmail({ email })
        if (validateEmail.length > 0) {
            throw new HttpException(`Email ${email} already exists`, HttpStatus.BAD_REQUEST);
        }

        const validateUsername = await this.userService.queryUsername({ username })

        if (validateUsername.length > 0) {
            throw new HttpException(`Username ${username} already exists`, HttpStatus.BAD_REQUEST);
        }

        const hash = await hashValue(password)

        const user = new User({ ...body, providerType: EProviderType['ACCOUNT'], isActive: true, password: hash })

        const initRole = await this.roleService.getRoleInitUser();

        const saveUser = await this.userService.saveUser(user);

        await this.userRoleService.createTransitionSaveRoleUser(saveUser?.insertId.toString(), initRole.id.toString())

        const { refreshToken } = await this.signToken(saveUser?.insertId.toString(), user?.username);

        await this.userService.saveRefreshToken(saveUser?.insertId, { refreshToken })

        return {
            status: HttpStatus.OK,
            message: 'Register successfully',
        }
    }

    async signToken(id: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign({
                id, username
            },
                {
                    secret: this.configService.get<string>('JWT_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_SECRET_EXPIRES')
                }),
            this.jwtService.sign({
                id, username
            },
                {
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: this.configService.get<string>('JWT_REFRESH_SECRET_EXPIRES')
                })
        ])

        return { accessToken, refreshToken };
    }
}
