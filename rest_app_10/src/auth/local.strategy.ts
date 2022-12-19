import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log("validate in local ")
    const userValid = await this._authService.validateUser({username, password});
    if (!!userValid) {
        return userValid;
    }
    throw new UnauthorizedException("User is not valid");
  }
}