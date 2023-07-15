import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/core/services/auth.service';
import { LoginInputDto } from '../dto/login-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginInputDto: LoginInputDto) {
    const loginResponse = await this.authService.login(loginInputDto);
    return loginResponse;
  }
}
