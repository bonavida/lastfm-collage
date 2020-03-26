/** Config */
import { lastfm } from 'config';
/** Types */
import { User } from 'models/user';
/** Utils */
import { generateApiSignature } from 'utils';
/** Modules */
import http from './core/http';

export const getUser = (sessionKey: string) => {
  const {
    apiUrl,
    auth: { apiKey },
  } = lastfm;
  const authParams = {
    method: 'user.getinfo',
    api_key: apiKey,
    sk: sessionKey,
  };
  const apiSig = generateApiSignature(authParams);
  const params = {
    ...authParams,
    api_sig: apiSig,
    format: 'json',
  };
  return http
    .get<{ user: User }>(`${apiUrl}`, { params })
    .then(res => res.data.user);
};
