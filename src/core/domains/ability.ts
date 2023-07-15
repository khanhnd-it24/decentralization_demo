import { Action } from 'src/core/enums/action';
import { Ability as AbilityPrisma } from '@prisma/client';

export class Ability implements AbilityPrisma {
  id: number;
  action: Action;
  entity: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}
