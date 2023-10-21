import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserService } from './interfaces/service.interface';
import { UserCreateRequestDTO } from '../dtos/requests/create.request.dto';
import { IUser } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';
import { hashPassword } from '../../common/utils/hash.utils';
import { UserUpdateRequestDTO } from '../dtos/requests/update.request.dto';
import * as fs from 'fs';
import { emailRegex } from '../../common/utils/regex.utils';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRespository: UserRepository) {}

  async store(userCreateRequestDTO: UserCreateRequestDTO): Promise<IUser> {
    if (!emailRegex(userCreateRequestDTO.email)) {
      throw new BadRequestException('E-mail invalid');
    }

    const user: IUser = await this.userRespository.show(
      userCreateRequestDTO.email,
    );

    if (user) {
      throw new ConflictException('E-mail already exists');
    }

    if (userCreateRequestDTO.password != userCreateRequestDTO.confirmPassword) {
      throw new BadRequestException('Passwords is different');
    }

    const hash: string = await hashPassword(userCreateRequestDTO.password);

    return await this.userRespository.store(userCreateRequestDTO, hash);
  }

  async show(email: string): Promise<IUser> {
    return await this.userRespository.show(email);
  }

  async update(
    email: string,
    userUpdateRequestDTO: UserUpdateRequestDTO,
  ): Promise<IUser> {
    if (userUpdateRequestDTO.password != userUpdateRequestDTO.confirmPassword) {
      throw new BadRequestException('Passwords is different');
    }

    const hash: string = await hashPassword(userUpdateRequestDTO.password);

    return await this.userRespository.update(email, userUpdateRequestDTO, hash);
  }

  async upload(email: string, avatar: Express.Multer.File): Promise<IUser> {
    const user: IUser = await this.userRespository.show(email);

    if (user.avatar != '') {
      fs.unlink(`./uploads/user/${user.avatar}`, (err) => {
        if (err) {
          throw new NotFoundException('File not found');
        }
      });
    }

    return await this.userRespository.upload(email, avatar.filename);
  }

  async getFile(email: string): Promise<string> {
    const user: IUser = await this.userRespository.show(email);
    return user.avatar;
  }
}
