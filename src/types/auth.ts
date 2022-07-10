import { Image } from '@customTypes/lastfm';

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

export interface User {
  id: string;
  username: string;
  name?: string;
  url: string;
  avatar: string;
}
