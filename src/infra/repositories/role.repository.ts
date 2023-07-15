import { Injectable } from '@nestjs/common';
import { PrismaService } from '../databases/prisma/prisma.service';
import { IBaseResult } from 'src/common/interfaces/base-result.interface';
import { Role } from 'src/core/domains/role';
import { ErrorCode } from 'src/common/errors/error';

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(role: string) {
    return await this.prismaService.role.create({
      data: {
        name: role,
      },
    });
  }

  async findById(id: number): Promise<IBaseResult<Role>> {
    const result = await this.prismaService.role.findUnique({
      where: { id },
      include: {
        abilities: true,
      },
    });

    if (!!result) {
      return {
        error: {
          code: ErrorCode.NOT_FOUND,
          message: 'Role not found',
        },
      };
    }

    return {
      data: { ...result },
    };
  }
}
