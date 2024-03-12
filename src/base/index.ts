import { Spotify } from "../typings";
import { getAccessToken } from "./getAccessToken";

namespace Base {
  export async function getSpotifyAccessToken(): Promise<Spotify.AccessToken> {
    return await getAccessToken();
  }
}

export default Base;
