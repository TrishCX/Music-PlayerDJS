import { Context } from "../typings";
import { makeYouTubeContextStructure } from "./core/makeYoutubeContext";
import { createSpotifyBearerContext as makeSpotifyBearerContext } from "./core/makeSpotifyBearerContext";

namespace PlayerContext {
  export function createInitialYoutubeContextStructure(
    context: Context.IContext
  ) {
    return makeYouTubeContextStructure(context);
  }
  export function createInitialSpotifyContextStructure(accessToken: string) {
    return makeSpotifyBearerContext(accessToken);
  }
}

export default PlayerContext;
