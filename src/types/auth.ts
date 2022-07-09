export interface Session {
  subscriber: number;
  name: string;
  key: string;
}

export interface AuthParams {
  method: string;
  api_key: string;
  token?: string;
  sk?: string;
}
