export type Session = {
  subscriber: number;
  name: string;
  key: string;
};

export type AuthParams = {
  method: string;
  api_key: string;
  token?: string;
  sk?: string;
};
