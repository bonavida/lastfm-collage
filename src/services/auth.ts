/** Config */
import { lastfm } from 'config';
/** Types */
import { Session } from 'models/auth';
/** Utils */
import { generateApiSignature } from 'utils';
/** Modules */
import http from './core/http';

export const login = () => {
  const {
    authUrl,
    auth: { apiKey },
  } = lastfm;
  if (authUrl && apiKey) {
    const url = `${authUrl}/?api_key=${apiKey}`;
    window.location.href = url;
  }
};

export const getSession = (token: string) => {
  const {
    apiUrl,
    auth: { apiKey },
  } = lastfm;
  const authParams = {
    method: 'auth.getSession',
    token,
    api_key: apiKey,
  };
  const apiSig = generateApiSignature(authParams);
  const params = {
    ...authParams,
    api_sig: apiSig,
    format: 'json',
  };
  return http
    .get<{ session: Session }>(`${apiUrl}`, { params })
    .then(res => res.data.session);
};
