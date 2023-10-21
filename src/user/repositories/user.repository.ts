import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/repository.interface';
import { UserCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { IUser } from '../interfaces/user.interface';
import { DatabaseService } from '../../database/database.service';
import { UserUpdateRequestDTO } from '../dtos/requests/update.request.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: DatabaseService) {}

  async store(
    { name, email }: UserCreateRequestDTO,
    hash: string,
  ): Promise<IUser> {
    return await this.prisma.user.create({
      data: { name, email, password: hash },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
  }

  async show(email: string): Promise<IUser> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        avatar: true,
      },
    });
  }

  async update(
    email: string,
    { name }: UserUpdateRequestDTO,
    hash: string,
  ): Promise<IUser> {
    return await this.prisma.user.update({
      where: { email },
      data: { name, password: hash },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        avatar: true,
      },
    });
  }

  async upload(email: string, avatar: string): Promise<IUser> {
    return await this.prisma.user.update({
      where: { email },
      data: { avatar },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        avatar: true,
      },
    });
  }
}
