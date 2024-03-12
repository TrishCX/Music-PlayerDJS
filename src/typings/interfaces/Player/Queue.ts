import { IAlbum, IArtists } from "../Spotify/SpotifyUtils";

export interface Queue {
  _id: string;
  name?: string;
  artists?: IArtists[];
  duration?: number;
  image?: string;
  album?: IAlbum;
  url?: string;
}
