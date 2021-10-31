/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ## Тип входных данных для авторизации
 */
export type LoginData = {
  email: string;
  password: string;
};

/**
 * ## Тип состояния формы авторизации
 */
export type AuthState = {
  isAuth?: boolean;
  isProcessed?: boolean;
  authError?: string;
};

/**
 * ## Тип токена
 */
export type AccessToken = string | any;

export type AccessTokenData = {
  accessToken: AccessToken;
};

/**
 * ## Тип данных пользователя
 */
export type UserLogin = {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserLoginData = {
  user: UserLogin;
};

/**
 * ## Тип данных авторизации (токен)
 */
export type AuthData = {
  accessToken: AccessToken;
  user: UserLogin;
};

// /**
//  * ##
//  */
// export type SessionDataUser = {
//   [key: string]: any;
// };

/**
 * ## Тип данных распарсенного токена
 */
export type TokenData = {
  email: string;
  exp: number;
  iat: number;
  password: string;
};
