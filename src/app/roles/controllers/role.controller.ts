import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleService } from 'src/core/services/role.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { AbilityGuard } from 'src/core/guards/ability.guard';
import { CheckAbilities } from 'src/core/decorators/ability.decorator';
import { Action } from 'src/core/enums/action';
import { Role } from 'src/core/domains/role';

@UseGuards(JwtAuthGuard, AbilityGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @CheckAbilities({ action: Action.CREATE, subject: Role })
  @Post('/')
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    await this.roleService.create(createRoleDto);
    return {
      code: 0,
      message: 'Success',
    };
  }
}
