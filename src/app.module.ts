import { Module } from '@nestjs/common';
import { UserModule } from './app/users/user.module';
import { RoleModule } from './app/roles/role.module';
import { AuthModule } from './app/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './core/strategies/jwt.strategy';

@Module({
  imports: [AuthModule, UserModule, RoleModule, JwtModule],
  providers: [JwtStrategy],
})
export class AppModule {}
