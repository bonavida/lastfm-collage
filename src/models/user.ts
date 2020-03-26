type Image = {
  size: string;
  '#text': string;
};

type RegisterTime = {
  unixtime: string;
  '#text': number;
};

export type User = {
  id?: number;
  type?: string;
  name?: string;
  realname?: string;
  url?: string;
  image?: Image[];
  country?: string;
  age?: number;
  gender?: string;
  subscriber?: number;
  playcount?: number;
  playlists?: number;
  bootstrap?: number;
  registered?: RegisterTime;
};
