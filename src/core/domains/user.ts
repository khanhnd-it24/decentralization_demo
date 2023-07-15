import { Role } from './role';
import { User as UserPrisma } from '@prisma/client';

export class User implements UserPrisma {
  id: number;
  email: string;
  password: string;
  name: string;
  roleId: number;
  role?: Role | null;

  createdAt: Date;
  updatedAt: Date;
}
