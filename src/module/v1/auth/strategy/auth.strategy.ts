import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { environment } from 'src/common/config/environment';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private reflector: Reflector) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT.SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userService.findById(payload._id);
      return user;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
