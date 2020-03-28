export type Image = {
  size: string;
  '#text': string;
};

type RegisterTime = {
  unixtime: string;
  '#text': number;
};

export type User = {
  id: number;
  type: string;
  name: string;
  realname: string;
  url: string;
  image: Image[];
  country: string;
  age: number;
  gender: string;
  subscriber: number;
  playcount: number;
  playlists: number;
  bootstrap: number;
  registered: RegisterTime;
};

export type Filters = {
  period?: string;
  limit?: number;
  page?: number;
};

export type Artist = {
  name?: string;
  mbid?: string;
  url?: string;
};

export type Album = {
  name?: string;
  playcount?: number;
  mbid?: string;
  url?: string;
  artist?: Artist;
  image?: Image[];
};
