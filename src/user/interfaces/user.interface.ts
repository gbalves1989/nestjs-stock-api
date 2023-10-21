export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
}

export interface IUserToken {
  accessToken: string;
}
