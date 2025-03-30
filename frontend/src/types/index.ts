export type ResponseStatus = {
  status: boolean;
  code: number;
  message: string;
};

export type APIResponse<T> = {
  [Key in keyof T]: T[Key];
} & ResponseStatus;

export type LoginResponse = {
  token: string;
  userId: string;
};
