import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleService } from './role.service';
import { RepositoryModule } from 'src/infra/repositories/repository.module';
import { ArgonService } from './argon.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [RepositoryModule, JwtModule],
  providers: [UserService, RoleService, ArgonService, AuthService],
  exports: [UserService, RoleService, ArgonService, AuthService],
})
export class ServiceModule {}
