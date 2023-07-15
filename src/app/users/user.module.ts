import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/core/services/service.module';
import { UserController } from './controllers/user.controller';
import { AbilityFactory } from 'src/core/factories/ability.factory';

@Module({
  controllers: [UserController],
  imports: [ServiceModule],
  providers: [AbilityFactory],
})
export class UserModule {}
