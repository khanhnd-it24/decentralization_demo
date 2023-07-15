import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/core/services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AbilityGuard } from 'src/core/guards/ability.guard';
import { CheckAbilities } from 'src/core/decorators/ability.decorator';
import { Action } from 'src/core/enums/action';
import { User } from 'src/core/domains/user';

@UseGuards(JwtAuthGuard, AbilityGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @CheckAbilities({ action: Action.CREATE, subject: User })
  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
