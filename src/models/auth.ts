export type Session = {
  subscriber?: number;
  name?: string;
  key?: string;
};

export type AuthParams = {
  method?: string;
  token?: string;
  api_key?: string;
  sk?: string;
};
