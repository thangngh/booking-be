import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshTokenGuard } from './guards/refresh_token.guard';
import { ReqUser } from 'common/decorators/rep-user.decorator';
import { User } from 'models/user/entities/user.entity';
import { Public } from 'common/decorators/public.decorator';
import { GetCookie } from 'common/decorators/get-cookie.decorator';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) { }

  // @Public()
  @Post("/register")
  register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }

  @Public()
  @Post("/login")
  login(@Body() body: LoginDto, @Res() res: Response) {
    console.log("body login", body)
    return this.authService.login(body, res)
  }

  @Public()
  @Post("/sign-out")
  signOut() {
    return 'sign out'
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("/refresh-token")
  refreshToken(@ReqUser() user: User, @GetCookie('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(user.id, { refreshToken })
  }
}
