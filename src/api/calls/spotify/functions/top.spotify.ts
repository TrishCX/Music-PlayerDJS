import request from "../../../../classes/Request";
import { SPOTIFY } from "../modifier/index";
import Base from "../../../../base";
import Context from "../../../../context/index";
// @types
import type { Type } from "../../../../@types/index";
import { formatSpotifyURI } from "../../../../formatters";
// @formatters

export async function spotifyTopResultTrack(queryParam: string) {
  const { TRACKS } = SPOTIFY;
  const { accessToken } = await Base.getSpotifyAccessToken();
  const context = Context.createInitialSpotifyContextStructure(
    accessToken as string
  );
  const url = TRACKS.TOP(queryParam);
  const requestCall: Type.Calls.Spotify.SpotifyTopResult = await request.get(
    url,
    {
      ...context,
    }
  );
  return parser(requestCall);
}

function parser(bodyContentStructure: Type.Calls.Spotify.SpotifyTopResult) {
  const { data } = bodyContentStructure;
  const topResult = data?.searchV2?.topResultsV2;
  const firstTopItemViaName = topResult.itemsV2[0]?.item;
  const item = firstTopItemViaName?.data;
  const name: string = item.name?.toString() as string;
  const _id: string = item.id?.toString() as string;
  const firstArtistName = item.artists?.items[0]?.profile?.name;
  return {
    _id,
    name,
    firstArtistName,

    queueData: {
      name: name,
      artists: item.artists?.items.map((artist) => ({
        name: artist.profile?.name,
        id: formatSpotifyURI(artist.uri),
      })),
      _id: _id,
      duration: item?.duration?.totalMilliseconds! / 1000,
      image: item.albumOfTrack?.coverArt.sources?.at(-1)?.url,
      url: item.uri,
      album: {
        name: item.albumOfTrack?.name,
        id: formatSpotifyURI(item.albumOfTrack?.uri as string),
      },
    },
  };
}
