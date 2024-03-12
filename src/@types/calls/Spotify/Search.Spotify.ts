export interface SearchSpotify {
  data: Data;
  extensions: Extensions;
}

export interface Data {
  searchV2: SearchV2;
}

export interface SearchV2 {
  query: string;
  tracksV2: TracksV2;
}

export interface TracksV2 {
  items: TracksV2Item[];
  pagingInfo: PagingInfo;
  totalCount: number;
}

export interface TracksV2Item {
  item: ItemItem;
  matchedFields: MatchedField[];
}

export interface ItemItem {
  __typename: ItemTypename;
  data: ItemData;
}

export enum ItemTypename {
  TrackResponseWrapper = "TrackResponseWrapper",
}

export interface ItemData {
  __typename: DataTypename;
  albumOfTrack: AlbumOfTrack;
  artists: Artists;
  associations: Associations;
  contentRating: ContentRating;
  duration: Duration;
  id: string;
  name: string;
  playability: Playability;
  uri: string;
}

export enum DataTypename {
  Track = "Track",
}

export interface AlbumOfTrack {
  coverArt: CoverArt;
  id: string;
  name: string;
  uri: string;
}

export interface CoverArt {
  extractedColors: ExtractedColors;
  sources: Source[];
}

export interface ExtractedColors {
  colorDark: ColorDark;
}

export interface ColorDark {
  hex: string;
  isFallback: boolean;
}

export interface Source {
  height: number;
  url: string;
  width: number;
}

export interface Artists {
  items: ArtistsItem[];
}

export interface ArtistsItem {
  profile: Profile;
  uri: string;
}

export interface Profile {
  name: string;
}

export interface Associations {
  associatedVideos: AssociatedVideos;
}

export interface AssociatedVideos {
  totalCount: number;
}

export interface ContentRating {
  label: Label;
}

export enum Label {
  Explicit = "EXPLICIT",
  None = "NONE",
}

export interface Duration {
  totalMilliseconds: number;
}

export interface Playability {
  playable: boolean;
}

export enum MatchedField {
  Name = "NAME",
}

export interface PagingInfo {
  limit: number;
  nextOffset: number;
}

export interface Extensions {
  requestIds: RequestIDS;
}

export interface RequestIDS {
  "/searchV2": SearchV2Class;
}

export interface SearchV2Class {
  "search-api": string;
}
