import { UserRepository } from 'src/infra/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { IBaseResult } from 'src/common/interfaces/base-result.interface';
import { User } from '../domains/user';
import { CreateUserDto } from 'src/app/users/dtos/create-user.dto';
import { ArgonService } from './argon.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly agronService: ArgonService,
  ) {}

  async findByEmail(email: string): Promise<IBaseResult<User>> {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: number): Promise<IBaseResult<User>> {
    return await this.userRepository.findById(id);
  }

  async create(user: CreateUserDto) {
    const hashPassword = await this.agronService.hash(user.password);
    return await this.userRepository.create({
      ...user,
      password: hashPassword,
    });
  }
}
