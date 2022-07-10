import { User } from '@customTypes/auth';

declare module 'iron-session' {
  interface IronSessionData {
    user: User;
    sessionKey: string;
    token: string;
  }
}
