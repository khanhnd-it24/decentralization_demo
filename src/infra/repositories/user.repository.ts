import { User } from 'src/core/domains/user';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../databases/prisma/prisma.service';
import { IBaseResult } from 'src/common/interfaces/base-result.interface';
import { ErrorCode } from 'src/common/errors/error';
import { CreateUserDto } from 'src/app/users/dtos/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: CreateUserDto) {
    return await this.prismaService.user.create({
      data: user,
    });
  }

  async findByEmail(email: string): Promise<IBaseResult<User>> {
    const result = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!result) {
      return {
        error: {
          code: ErrorCode.NOT_FOUND,
          message: 'User not found',
        },
      };
    }

    return {
      data: result,
    };
  }

  async findById(id: number): Promise<IBaseResult<User>> {
    try {
      const result = await this.prismaService.user.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              abilities: true,
            },
          },
        },
      });

      if (!result) {
        return {
          error: {
            code: ErrorCode.NOT_FOUND,
            message: 'User not found',
          },
        };
      }

      return {
        data: result,
      };
    } catch (error) {
      throw new BadRequestException('error');
    }
  }
}
