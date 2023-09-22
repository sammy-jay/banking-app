import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto';
import { JwtGuard } from './guard/jwt.guard';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';
import { LocalGuard } from './guard/local.guard';
import { RequestUser } from './interface/request-user.interface';
import { UserService } from 'src/user/user.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @HttpCode(200)
  @UseGuards(JwtGuard)
  @Get('profile')
  async profile(@Req() request: RequestUser) {
    return request.user;
  }

  @Post('register')
  async register(@Body() registrationData: RegistrationDto) {
    const user = await this.authService.register(registrationData);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Req() request: RequestUser) {
    const user = request.user;
    delete user.password;
    const accessTokenCookie = this.authService.getCookieWithJwtToken(user.id);
    const { refreshTokenCookie, refreshToken } =
      await this.authService.getCookieWithJwtRefreshToken(user.id);
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return user;
  }
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestUser) {
    const user = request.user;
    delete user.password;
    const accessTokenCookie = this.authService.getCookieWithJwtToken(user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return user;
  }
  @HttpCode(204)
  @UseGuards(JwtGuard)
  @Get('logout')
  async logout(@Req() request: RequestUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
  }
}
