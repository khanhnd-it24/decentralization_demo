export interface Error {
  code: number;
  message: string;
}

export const ErrorCode = {
  EXISTED: 1001,
  NOT_FOUND: 1002,
  PASSWORD_INCORRECT: 1003,
};
