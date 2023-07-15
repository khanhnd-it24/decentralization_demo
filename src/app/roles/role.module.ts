import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/core/services/service.module';
import { RoleController } from './controllers/role.controller';
import { AbilityFactory } from 'src/core/factories/ability.factory';

@Module({
  controllers: [RoleController],
  imports: [ServiceModule],
  providers: [AbilityFactory],
})
export class RoleModule {}
