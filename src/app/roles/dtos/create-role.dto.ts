import { CreateAbilityDto } from './create-ability.dto';

export class CreateRoleDto {
  name: string;
  abilities: CreateAbilityDto[];
}
