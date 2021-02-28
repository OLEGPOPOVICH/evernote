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
  isAuthorizationed?: boolean;
  isProcessed?: boolean;
  authError?: string;
};

/**
 * ## Тип токена
 */
export type AccessToken = string;

/**
 * ## Тип данных авторизации (токен)
 */
export type ServerData = {
  accessToken: AccessToken;
  user: ServerDataUser;
};

/**
 * ##
 */
export type ServerDataUser = {
  [key: string]: any;
};

/**
 * ## Тип данных распарсенного токена
 */
export type TokenData = {
  [key: string]: string | number;
};

/**
 * ##
 */
export type ResponseType = {
  [key: string]: any;
};
