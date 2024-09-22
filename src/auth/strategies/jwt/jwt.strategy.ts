import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConstants } from 'src/auth/auth.constants';
import { AuthDTO } from 'src/auth/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConstants.secret,
    });
  }

  validate(payload: AuthDTO) {
    console.log(`JWT-Strategy validate() --> ${payload}`);
    return payload;
  }
}
