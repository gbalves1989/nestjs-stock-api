import { UserCreateRequestDTO } from '../../../user/dtos/requests/create.request.dto';
import { IUser, IUserToken } from '../../../user/interfaces/user.interface';

export interface IUserSignIn {
  email: string;
  _id: string;
}

export interface IAuthService {
  validateUser(email: string, password: string): Promise<IUser | null>;
  signIn(user: IUserSignIn): Promise<IUserToken>;
  signUp(userCreateRequestDTO: UserCreateRequestDTO): Promise<IUser>;
  me(email: string): Promise<IUser>;
}
