import { Ability } from './ability';
import { Role as RolePrisma } from '@prisma/client';
export class Role implements RolePrisma {
  id: number;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;

  abilities: Ability[];
}
