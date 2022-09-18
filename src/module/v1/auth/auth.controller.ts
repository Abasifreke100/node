import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { USER_CREATED } from 'src/common/constants/user.constants';
import { ResponseMessage } from 'src/common/decorator/response.decorator';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ResponseMessage(USER_CREATED)
  async register(@Body() requestPayload: CreateUserDto) {
    return await this.authService.register(requestPayload);
  }
}
