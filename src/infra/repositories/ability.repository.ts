import { Injectable } from '@nestjs/common';
import { CreateAbilityDto } from 'src/app/roles/dtos/create-ability.dto';
import { PrismaService } from 'src/infra/databases/prisma/prisma.service';

@Injectable()
export class AbilityRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(abilities: CreateAbilityDto[], roleId: number) {
    const data = abilities.map((a) => ({ ...a, roleId }));
    return await this.prismaService.ability.createMany({
      data: data,
    });
  }
}
