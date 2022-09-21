import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LOGGED_IN, USER_CREATED } from 'src/common/constants/user.constants';
import { Public } from 'src/common/decorator/public.decorator';
import { ResponseMessage } from 'src/common/decorator/response.decorator';
import { generateIdentifier } from 'src/common/utils/uniqueId';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { IAuthResponse } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post()
  @ResponseMessage(USER_CREATED)
  async register(
    @Body() requestPayload: CreateUserDto,
  ): Promise<IAuthResponse> {
    const user = await this.authService.register(requestPayload);
    return {
      user,
      accessToken: this.jwtService.sign({
        _id: user._id,
        role: user.role,
        generator: generateIdentifier(),
      }),
    };
  }

  @Public()
  @Post('login')
  @ResponseMessage(LOGGED_IN)
  async login(@Body() requestPayload: LoginDto): Promise<IAuthResponse> {
    const user = await this.authService.login(requestPayload);
    return {
      user,
      accessToken: this.jwtService.sign({
        _id: user._id,
        role: user.role,
        generator: generateIdentifier(),
      }),
    };
  }
}
