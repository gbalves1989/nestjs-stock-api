import { UserUpdateRequestDTO } from '../../../user/dtos/requests/update.request.dto';
import { UserCreateRequestDTO } from '../../../user/dtos/requests/create.request.dto';
import { IUser } from '../../../user/interfaces/user.interface';

export interface IUserRepository {
  store(
    userCreateRequestDTO: UserCreateRequestDTO,
    hash: string,
  ): Promise<IUser>;
  show(email: string): Promise<IUser>;
  update(
    email: string,
    userUpdateRequestDTO: UserUpdateRequestDTO,
    hash: string,
  ): Promise<IUser>;
  upload(email: string, avatar: string): Promise<IUser>;
}
