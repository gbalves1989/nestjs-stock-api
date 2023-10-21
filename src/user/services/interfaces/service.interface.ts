import { UserUpdateRequestDTO } from '../../../user/dtos/requests/update.request.dto';
import { UserCreateRequestDTO } from '../../../user/dtos/requests/create.request.dto';
import { IUser } from '../../../user/interfaces/user.interface';

export interface IUserService {
  store(userCreateRequestDTO: UserCreateRequestDTO): Promise<IUser>;
  show(email: string): Promise<IUser>;
  update(
    email: string,
    userUpdateRequestDTO: UserUpdateRequestDTO,
  ): Promise<IUser>;
  upload(email: string, avatar: Express.Multer.File): Promise<IUser>;
  getFile(email: string): Promise<string>;
}
