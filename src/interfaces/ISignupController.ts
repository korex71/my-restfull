interface ISignupServiceResponse {
  error: Boolean;
  statusCode: number;
  users: User;
}

interface User {
  _id: string;
  email: string;
  password: string;
  user: string;
  twoFactors: string;
  createdAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  __v: number;
}

interface UserModel {
  email: string;
  user: string;
  password: string;
  twoFactors: string;
}

export default interface ISignupService {
  update(id: string, body: any);
  getAll: () => Promise<ISignupServiceResponse>;

  insert: (data: UserModel) => Promise<any>;
}
