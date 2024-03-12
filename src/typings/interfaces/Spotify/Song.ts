import { IAlbum, IArtists } from "./SpotifyUtils";

export type SpotifySearchSongResults = {
  title?: string;
  album?: IAlbum;
  image?: string;
  id?: string;
  duration?: number;
  artists?: IArtists[];
};
