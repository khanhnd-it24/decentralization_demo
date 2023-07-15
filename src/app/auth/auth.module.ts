import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/core/services/service.module';
import { AuthController } from './controllers/auth.controller';
import { AbilityFactory } from 'src/core/factories/ability.factory';

@Module({
  controllers: [AuthController],
  imports: [ServiceModule],
  providers: [AbilityFactory],
})
export class AuthModule {}
