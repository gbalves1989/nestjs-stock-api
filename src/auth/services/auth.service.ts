import { Injectable } from '@nestjs/common';
import { IAuthService, IUserSignIn } from './interfaces/service.interface';
import { IUser, IUserToken } from '../../user/interfaces/user.interface';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from '../../common/utils/hash.utils';
import { UserCreateRequestDTO } from '../../user/dtos/requests/create.request.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUser | null> {
    const user: IUser = await this.userService.show(email);
    const isValidPassword: boolean = await checkPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) return user;

    return null;
  }

  async signIn(user: IUserSignIn): Promise<IUserToken> {
    const payload = {
      username: user.email,
      sub: user._id,
    };

    return {
      accessToken: await this.jwtService.sign(payload),
    };
  }

  async signUp(userCreateRequestDTO: UserCreateRequestDTO): Promise<IUser> {
    return await this.userService.store(userCreateRequestDTO);
  }

  async me(email: string): Promise<IUser> {
    return await this.userService.show(email);
  }
}
