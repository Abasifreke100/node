import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { MongoExceptionFilter } from 'src/common/utils/mongoose.filter';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
}
