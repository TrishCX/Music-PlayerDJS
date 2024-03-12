import Context from "../../../../context/index";
import request from "../../../../classes/Request";
// @type
import type { Type } from "../../../../@types/index";

export async function getSuggestion(id: string) {
  const context = Context.createInitialYoutubeContextStructure({
    client: {
      name: "WEB_REMIX",
      version: "0.1",
    },
  });
  const url: string = `https://music.youtube.com/youtubei/v1/next`;

  const response: Type.Calls.Youtube.Recommendations = (await request.post(
    url,
    {
      ...context.body,
      enablePersistentPlaylistPanel: true,
      isAudioOnly: true,
      params: "mgMDCNgE",
      playerParams: "igMDCNgE",
      tunerSettingValue: "AUTOMIX_SETTING_NORMAL",
      playlistId: `RDAMVM${id}`,
      videoId: `${id}`,
    }
  )) as Type.Calls.Youtube.Recommendations;
  return parseBodyContent(response);
}

function parseBodyContent(
  bodyContent: Type.Calls.Youtube.Recommendations
): Type.Calls.Youtube.NextTracks[] {
  const { contents } = bodyContent;
  const coreContent =
    contents?.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
      .watchNextTabbedResultsRenderer?.tabs[0].tabRenderer?.content
      ?.musicQueueRenderer.content?.playlistPanelRenderer?.contents;
  const nextTracks: Type.Calls.Youtube.NextTracks[] = [];

  for (const item of coreContent!) {
    const { playlistPanelVideoRenderer } = item;
    const videoPanel = playlistPanelVideoRenderer;
    const track = videoPanel;
    const title: string = track.title?.runs[0].text.toString();
    const _id: string = track.videoId.toString();
    nextTracks.push({
      _id,
      name: title,
      url: `https://youtube.com/watch?v=${_id}`,
    });
  }
  return nextTracks;
}
