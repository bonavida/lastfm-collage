/** Config */
import { lastfm } from 'config';
/** Types */
import { AuthParams } from 'models/auth';
import { ResponseUser, Filters, ResponseAlbum } from 'models/lastfm';
/** Utils */
import { generateApiSignature } from 'utils';
/** Modules */
import http from './core/http';

export const getUser = (sessionKey: string) => {
  const {
    apiUrl,
    auth: { apiKey },
  } = lastfm;
  const authParams: AuthParams = {
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
    .get<{ user: ResponseUser }>(`${apiUrl}`, { params })
    .then(res => res.data.user);
};

export const getUserTopAlbums = (
  username: string | undefined,
  sessionKey: string | undefined,
  filters: Filters
) => {
  const {
    apiUrl,
    auth: { apiKey },
  } = lastfm;
  const signatureParams = {
    method: 'user.gettopalbums',
    user: username,
    api_key: apiKey,
    sk: sessionKey,
    ...filters,
  };
  const apiSig = generateApiSignature(signatureParams);
  const params = {
    ...signatureParams,
    api_sig: apiSig,
    format: 'json',
  };
  return http
    .get<{ topalbums: { album: ResponseAlbum[] } }>(`${apiUrl}`, { params })
    .then(res => res.data.topalbums);
};
