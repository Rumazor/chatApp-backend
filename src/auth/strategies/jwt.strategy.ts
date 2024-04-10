import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/interfaces/payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { sub } = payload;

    const user = await this.prisma.users.findUnique({
      where: { id: sub },
    });

    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }

    if (user.is_active === false) {
      throw new UnauthorizedException('User is not active');
    }

    return user;
  }
}
