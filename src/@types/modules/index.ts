declare module "youtube-stream-url" {
  interface Options {
    url: string;
    throwOnError?: boolean;
  }
  export interface Response {
    videoDetails: VideoDetails;
    formats: Format[];
  }

  export interface Format {
    itag: number;
    mimeType: string;
    bitrate: number;
    width?: number;
    height?: number;
    lastModified: string;
    contentLength: string;
    quality: string;
    fps?: number;
    qualityLabel?: string;
    projectionType: ProjectionType;
    averageBitrate: number;
    audioQuality?: string;
    approxDurationMs: string;
    audioSampleRate?: string;
    audioChannels?: number;
    url: string;
    initRange?: ColorInfo[];
    indexRange?: ColorInfo[];
    colorInfo?: ColorInfo[];
    highReplication?: boolean;
    loudnessDb?: number;
  }

  export interface ColorInfo {}

  export enum ProjectionType {
    Rectangular = "RECTANGULAR",
  }

  export interface VideoDetails {
    videoId: string;
    title: string;
    lengthSeconds: string;
    keywords: string[];
    channelId: string;
    isOwnerViewing: boolean;
    shortDescription: string;
    isCrawlable: boolean;
    thumbnail: Thumbnail;
    allowRatings: boolean;
    viewCount: string;
    author: string;
    isPrivate: boolean;
    isUnpluggedCorpus: boolean;
    isLiveContent: boolean;
  }

  export interface Thumbnail {
    thumbnails: ColorInfo[];
  }

  export function getInfo(options: Options): Promise<Response>;
}
