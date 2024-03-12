import type { Spotify } from "../typings/index";
import Api from "../api/index";
import Request from "../classes/Request/index";

export async function getAccessToken(): Promise<Spotify.AccessToken> {
  const spotifyClientRequest: Spotify.AccessToken = await Request.get(
    Api.Spotify.ACCESS_SPOTIFY_URI
  );
  return {
    ...spotifyClientRequest,
  };
}
