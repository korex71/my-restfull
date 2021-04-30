interface ISigninServiceDefault {
  error: Boolean;
  statusCode: number;
  message: string;
  data: {
    email?: string;
    user?: string;
  };
}

interface User {
  _id?: string;
  email: string;
  password: string;
  user: string;
  twoFactors: string;
  createdAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  __v?: number;
}

interface ISigninAuthenticate {
  error: Boolean;
  statusCode: number;
  message: string;
  data: {
    user?: User;
    token?: string;
  };
}

export default interface ISigninService {
  authenticate: (
    email: string,
    password: string
  ) => Promise<ISigninAuthenticate>;

  forgotPassword: (email: string) => Promise<ISigninServiceDefault>;

  forgotSuccess: (
    email: string,
    newPassword: string
  ) => Promise<ISigninServiceDefault>;
}
