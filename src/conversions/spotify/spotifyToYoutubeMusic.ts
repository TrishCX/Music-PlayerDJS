import { getAccessToken } from "../../base/getAccessToken";
import Context from "../../context/index";
import request from "../../classes/Request";
// @type
import type { Type } from "../../@types";

// @constants
import { SPOTIFY } from "../../api/calls/spotify/modifier";
import { YOUTUBE_MUSIC } from "../../api/calls/spotify/constants/youtube-music";
import { SONG_PARAM } from "../../configuration/index";

export async function spotifyConversion(spotifyInitialId: string) {
  const { accessToken } = await getAccessToken();
  const context = Context.createInitialSpotifyContextStructure(
    accessToken as string
  );
  const trackParameters: string = `EgWKAQIIAWoSEAMQBBAJEA4QEBAKEAUQERAV`;
  const youtubeContext = Context.createInitialYoutubeContextStructure({
    client: {
      name: "WEB_REMIX",
      version: "0.1",
    },
  });

  const { TRACKS } = SPOTIFY;
  const url = TRACKS.GET(spotifyInitialId);
  const requestToCall = await request.get(url, {
    ...context,
  });
  const data = parseSpotifyURL(requestToCall);
  const youtubeMusicRequestToCall = (await request.post(
    YOUTUBE_MUSIC.SEARCH_TRACK_SINGLE,
    {
      ...youtubeContext.body,
      params: trackParameters,
      query: `${data.name} by ${data.artist}`,
    }
  )) as Type.Calls.Youtube.SearchResponse;
  const track = parseYoutubeContextBodyStructure(youtubeMusicRequestToCall);
  return track;
}

export async function spotifyConversionWithSongParam(
  name: string,
  firstArtistName: string
) {
  const trackParameters: string = `EgWKAQIIAWoSEAMQBBAJEA4QEBAKEAUQERAV`;
  const youtubeContext = Context.createInitialYoutubeContextStructure({
    client: {
      name: "WEB_REMIX",
      version: "0.1",
    },
  });

  const youtubeMusicRequestToCall = (await request.post(
    YOUTUBE_MUSIC.SEARCH_TRACK_SINGLE,
    {
      ...youtubeContext.body,
      params: trackParameters,
      query: `${name} by ${firstArtistName}`,
    }
  )) as Type.Calls.Youtube.SearchResponse;
  const track = parseYoutubeContextBodyStructure(youtubeMusicRequestToCall);
  return track;
}

function parseSpotifyURL(body: any) {
  const { data } = body;
  const union = data.trackUnion;
  const trackName: string = union?.name;
  const firstArtistName: string = union?.firstArtist?.items[0]?.profile?.name;

  return { name: trackName, artist: firstArtistName };
}

function parseYoutubeContextBodyStructure(
  body: Type.Calls.Youtube.SearchResponse
) {
  const content =
    body.contents.tabbedSearchResultsRenderer.tabs[0]?.tabRenderer?.content?.sectionListRenderer.contents?.pop()
      ?.musicShelfRenderer?.contents[0];
  const name =
    content?.musicResponsiveListItemRenderer.flexColumns[0]
      .musicResponsiveListItemFlexColumnRenderer.text?.runs[0]?.text;
  const id =
    content?.musicResponsiveListItemRenderer.flexColumns[0]
      ?.musicResponsiveListItemFlexColumnRenderer?.text?.runs[0]
      .navigationEndpoint?.watchEndpoint?.videoId;
  const formedURL: string = `https://youtube.com/watch?v=${id}`;

  return { _id: id, _url: formedURL, name };
}
