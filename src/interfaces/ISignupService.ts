interface mailParams {
  email: string;
  user: string;
  base64?: string;
  token?: string;
}

interface updateParams {
  email: string;
  user: string;
}

export interface IInsertUser {
  email: string;
  user: string;
  password: string;
  twoFactors: string;
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

export interface ISignupReturn {
  error: Boolean;
  statusCode: number;
  message?: string;
  users?: User;
}

interface getUser {
  error: boolean;
  statusCode: number;
  user?: User | undefined;
  message?: undefined;
}

export default interface ISignupService {
  sendMail: (obj: mailParams) => Promise<string>;

  update: (id: string, data: updateParams) => Promise<string>;

  delete: (user: string) => Promise<string>;

  getUser: (param: string) => Promise<getUser>;

  insert: (obj: Object[]) => Promise<string>;

  getAll: () => Promise<string>;
}
