import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { User } from '../domains/user';
import { Role } from '../domains/role';
import { Action } from '../enums/action';

export type Subjects = InferSubjects<typeof User | typeof Role> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

export const allEntities = ['USER', 'ROLE'];

export class AbilityFactory {
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      PureAbility as AbilityClass<AppAbility>,
    );
    console.log(user);
    if (user.role.isAdmin) {
      can(Action.CREATE, 'all');
      can(Action.UPDATE, 'all');
      can(Action.READ, 'all');
      can(Action.DELETE, 'all');
    } else {
      for (const entity of allEntities) {
        for (const action of Object.values(Action)) {
          const isPossibleAction = user.role.abilities.some(
            (v) => v.action === action && v.entity === entity,
          );
          if (isPossibleAction) {
            can(action, this.getEntityFromEntityName(entity));
          } else {
            cannot(action, this.getEntityFromEntityName(entity)).because(
              'you are not authorized to perform this action',
            );
          }
        }
      }
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  getEntityFromEntityName(entityName: string) {
    switch (entityName) {
      case 'USER':
        return User;
      case 'ROLE':
        return Role;
      default:
        return null;
    }
  }
}
