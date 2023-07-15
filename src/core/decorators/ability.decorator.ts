import { SetMetadata } from '@nestjs/common';
import { Action } from '../enums/action';
import { Subjects } from '../factories/ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}

export const CHECK_ABILITIES = 'CHECK_ABILITIES';
export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITIES, requirements);
