import type { ClientTypeResolver } from "./client/ClientTypeResolver";
import type { CallResolverType } from "./calls/Resolver/CallResolverType";
import type { SearchSpotify } from "../@types/calls/Spotify/Search.Spotify";
import type { TopSpotify } from "./calls/Spotify/Top.Spotify";
import type { YoutubeSearchResults } from "./calls/Youtube/YoutubeSearch";
import type { Loop as LoopType } from "./player/Loop";
import type { Recommendations as RecommendationsType } from "./calls/Youtube/Recommendations";
import type { NextTracks as YoutubeNextTracks } from "./calls/Youtube/NextTracks";

namespace Type {
  /**
   * Represents the type resolver for client entities.
   * It defines the structure and behavior to resolve client types.
   */
  export type Client = ClientTypeResolver;
  export namespace Calls {
    export namespace Spotify {
      export type SearchTracksResponse = SearchSpotify;
      export type SpotifyTopResult = TopSpotify;
    }
    export namespace Youtube {
      export type SearchResponse = YoutubeSearchResults;
      export type Recommendations = RecommendationsType;
      export type NextTracks = YoutubeNextTracks;
    }
  }

  export namespace PlayerOptions {
    export type Loop = LoopType;
  }
}

export { Type };
