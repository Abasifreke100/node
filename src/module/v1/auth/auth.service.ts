import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<CreateUserDto>): Promise<User> {
    const { password } = user;

    const hash = await this.hashPassword(password);
    const createdUser = await this.userService.create({
      ...user,
      password: hash,
    });
    return createdUser;
  }
}
