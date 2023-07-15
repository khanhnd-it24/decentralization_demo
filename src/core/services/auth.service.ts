import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { TokenUserPayloadDto } from 'src/app/auth/dto/token-user-payload.dto';
import { LoginInputDto } from 'src/app/auth/dto/login-input.dto';
import { ArgonService } from './argon.service';
import { ErrorCode } from 'src/common/errors/error';
import { User } from '../domains/user';
import { ILoginResponse } from 'src/app/auth/interfaces/login-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly agronService: ArgonService,
  ) {}

  generateAccessToken(payload: TokenUserPayloadDto): string {
    const accessToken: string = this.jwtService.sign(payload, {
      secret: 'secret',
      expiresIn: '1d',
    });
    return accessToken;
  }

  generateRefreshToken(payload: TokenUserPayloadDto): string {
    return this.jwtService.sign(payload, {
      secret: 'refresh_secret',
      expiresIn: '1d',
    });
  }

  async verifyAccessToken(
    token: string,
  ): Promise<{ newAccessToken?: string; payload: TokenUserPayloadDto }> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: 'secret',
      });
      return { payload };
    } catch (err: any) {
      throw new UnauthorizedException('token invalid');
    }
  }

  async validateUser(loginInputDto: LoginInputDto): Promise<User> {
    const userData = await this.userService.findByEmail(loginInputDto.email);

    if (!!userData.error) {
      throw new HttpException(userData.error, HttpStatus.BAD_REQUEST);
    }

    const isPasswordMatching = await this.agronService.verify(
      userData.data.password,
      loginInputDto.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        { code: ErrorCode.PASSWORD_INCORRECT, message: 'Password incorrect' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return userData.data;
  }

  async login(loginInputDto: LoginInputDto): Promise<ILoginResponse> {
    const user = await this.validateUser(loginInputDto);
    const accessToken = this.generateAccessToken({
      sub: user.id,
      name: user.name,
      role: user.roleId,
    });

    return {
      accessToken: accessToken,
    };
  }
}
