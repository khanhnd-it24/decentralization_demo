import { Injectable } from '@nestjs/common';

import { CreateRoleDto } from 'src/app/roles/dtos/create-role.dto';
import { AbilityRepository } from 'src/infra/repositories/ability.repository';
import { RoleRepository } from 'src/infra/repositories/role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly abilityRepository: AbilityRepository,
  ) {}

  async create(role: CreateRoleDto) {
    const createdRole = await this.roleRepository.create(role.name);
    await this.abilityRepository.create(role.abilities, createdRole.id);
  }
}
