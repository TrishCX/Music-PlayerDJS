import request from "../../../../classes/Request";
import { SPOTIFY } from "../modifier/index";
import Base from "../../../../base";
import Context from "../../../../context/index";
// @types
import type { Type } from "../../../../@types/index";
// @formatters
import { formatSpotifyURI } from "../../../../formatters";
import { Spotify } from "../../../../typings";

export async function spotifySearchTracks(searchTerm: string, offSet?: number) {
  const { TRACKS } = SPOTIFY;
  const { accessToken } = await Base.getSpotifyAccessToken();
  const context = Context.createInitialSpotifyContextStructure(
    accessToken as string
  );
  const url = TRACKS.SEARCH(searchTerm, offSet);
  const requestCall: Type.Calls.Spotify.SearchTracksResponse =
    await request.get(url, {
      ...context,
    });
  const data = parse(requestCall);
  return data;
}

function parse(body: Type.Calls.Spotify.SearchTracksResponse) {
  const { data } = body;
  const tracks: Spotify.SpotifySongSearchResults[] = [];

  const queryOperation = data.searchV2;
  const { tracksV2 } = queryOperation;

  for (const item of tracksV2.items) {
    const query = item?.item;
    const data = query.data;
    const title = data?.name;
    const album = { name: data.albumOfTrack.name, id: data.albumOfTrack.id };
    const image = data.albumOfTrack.coverArt.sources[0].url;
    const id = data?.id;
    const duration = data.duration.totalMilliseconds / 1000;
    const artists = data.artists?.items.map((item) => ({
      name: item.profile.name,
      id: formatSpotifyURI(item.uri),
    }));
    tracks.push({
      album,
      artists,
      duration,
      id,
      image,
      title,
    });
  }
  return tracks;
}
