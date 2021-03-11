/**
 * ## Тип входных данных для авторизации
 */
export type LoginData = {
  email?: string;
  password?: string;
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
export type AccessToken = string;

/**
 * ## Тип данных авторизации (токен)
 */
export type SessionData = {
  accessToken?: AccessToken;
  user?: SessionDataUser;
};

/**
 * ##
 */
export type SessionDataUser = {
  [key: string]: any;
};

/**
 * ## Тип данных распарсенного токена
 */
export type TokenData = {
  [key: string]: string | number;
};
