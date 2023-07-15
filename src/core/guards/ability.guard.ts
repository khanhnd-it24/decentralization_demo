import { ForbiddenError } from '@casl/ability';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITIES, RequiredRule } from '../decorators/ability.decorator';
import { AbilityFactory } from '../factories/ability.factory';
import { UserService } from '../services/user.service';

@Injectable()
export class AbilityGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(
        CHECK_ABILITIES,
        context.getHandler(),
      ) || [];

    try {
      const { user } = context.switchToHttp().getRequest();
      const result = await this.userService.findById(user.sub);
      if (!!result.error) {
        throw new BadRequestException('User not found');
      }

      const ability = this.abilityFactory.defineAbility(result.data);

      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
      });
      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
