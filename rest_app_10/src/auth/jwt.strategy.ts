import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // secret: process.env.TOKEN_SECRET,
      secretOrKey: jwtConstants.secret,
      // secretOrPrivateKey: `${process.env.TOKEN_SECRET}`      
    });
  }

  async validate(payload: any) {
    console.log("in payload: "+JSON.stringify(payload));
    payload["app"]="myNestApp";
    return payload;
  }
}