import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RoleRepository } from './role.repository';
import { AbilityRepository } from './ability.repository';
import { DatabaseModule } from '../databases/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, RoleRepository, AbilityRepository],
  exports: [UserRepository, RoleRepository, AbilityRepository],
})
export class RepositoryModule {}
