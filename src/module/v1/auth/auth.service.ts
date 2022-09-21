import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User, UserDocument } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(
    requestPayload: Readonly<CreateUserDto>,
  ): Promise<UserDocument> {
    const { password } = requestPayload;
    const hash = await this.hashPassword(password);
    const createdUser = await this.userService.create({
      ...requestPayload,
      password: hash,
    });
    return createdUser;
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    try {
      const user = await this.userService.findByEmail(email);

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!user && comparePassword) {
        throw new NotFoundException('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async login(request: LoginDto): Promise<UserDocument> {
    const { email, password } = request;
    try {
      const user = await this.validateUser(email, password);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
