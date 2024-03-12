// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface TopSpotify {
  data: Data;
  extensions: Extensions;
}

export interface Data {
  searchV2: SearchV2;
}

export interface SearchV2 {
  albumsV2: AlbumsV2;
  artists: GenresClass;
  audiobooks: Audiobooks;
  chipOrder: ChipOrder;
  episodes: Episodes;
  genres: GenresClass;
  playlists: Playlists;
  podcasts: Podcasts;
  topResultsV2: TopResultsV2;
  tracksV2: TracksV2;
  users: Users;
}

export interface AlbumsV2 {
  __typename: string;
  items: AlbumsV2Item[];
  totalCount: number;
}

export interface AlbumsV2Item {
  __typename: PurpleTypename;
  data: PurpleData;
}

export enum PurpleTypename {
  AlbumResponseWrapper = "AlbumResponseWrapper",
}

export interface PurpleData {
  __typename: FluffyTypename;
  artists: TopicsClass;
  coverArt: CoverArtElement;
  date: DateClass;
  name: string;
  uri: string;
}

export enum FluffyTypename {
  Album = "Album",
}

export interface TopicsClass {
  items: PurpleItem[];
}

export interface PurpleItem {
  profile: Publisher;
  uri: string;
}

export interface Publisher {
  name: string;
}

export interface CoverArtElement {
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
  height: number | null;
  url: string;
  width: number | null;
}

export interface DateClass {
  year: number;
}

export interface GenresClass {
  items: GenresItem[];
  totalCount: number;
}

export interface GenresItem {
  __typename: TentacledTypename;
  data: FluffyData;
}

export enum TentacledTypename {
  ArtistResponseWrapper = "ArtistResponseWrapper",
}

export interface FluffyData {
  __typename: StickyTypename;
  profile: Profile;
  uri: string;
  visuals: Visuals;
}

export enum StickyTypename {
  Artist = "Artist",
}

export interface Profile {
  name: string;
  verified: boolean;
}

export interface Visuals {
  avatarImage: CoverArtElement;
}

export interface Audiobooks {
  items: AudiobooksItem[];
  totalCount: number;
}

export interface AudiobooksItem {
  __typename: IndigoTypename;
  data: TentacledData;
}

export enum IndigoTypename {
  AudiobookResponseWrapper = "AudiobookResponseWrapper",
}

export interface TentacledData {
  __typename: IndecentTypename;
  accessInfo: null;
  authors: Publisher[];
  coverArt: CoverArtElement;
  mediaType: MediaType;
  name: string;
  publishDate: PublishDate;
  topics: TopicsClass;
  uri: string;
}

export enum IndecentTypename {
  Audiobook = "Audiobook",
}

export enum MediaType {
  Audio = "AUDIO",
  Mixed = "MIXED",
}

export interface PublishDate {
  isoString: string;
}

export interface ChipOrder {
  items: ChipOrderItem[];
}

export interface ChipOrderItem {
  typeName: string;
}

export interface Episodes {
  items: EpisodesItem[];
  totalCount: number;
}

export interface EpisodesItem {
  __typename: HilariousTypename;
  data: StickyData;
}

export enum HilariousTypename {
  EpisodeResponseWrapper = "EpisodeResponseWrapper",
}

export interface StickyData {
  __typename: AmbitiousTypename;
  contentRating: ContentRating;
  coverArt: CoverArtElement;
  description: string;
  duration: Duration;
  mediaTypes: MediaType[];
  name: string;
  playability: PurplePlayability;
  playedState: PlayedState;
  podcastV2: PodcastV2;
  releaseDate: ReleaseDate;
  restrictions: Restrictions;
  uri: string;
}

export enum AmbitiousTypename {
  Episode = "Episode",
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

export interface PurplePlayability {
  reason: Reason;
}

export enum Reason {
  Playable = "PLAYABLE",
}

export interface PlayedState {
  playPositionMilliseconds: number;
  state: State;
}

export enum State {
  NotStarted = "NOT_STARTED",
}

export interface PodcastV2 {
  __typename: PodcastV2Typename;
  data: PodcastV2Data;
}

export enum PodcastV2Typename {
  PodcastResponseWrapper = "PodcastResponseWrapper",
}

export interface PodcastV2Data {
  __typename: CunningTypename;
  coverArt: DataCoverArt;
  mediaType: MediaType;
  name: string;
  publisher: Publisher;
  uri: string;
}

export enum CunningTypename {
  Podcast = "Podcast",
}

export interface DataCoverArt {
  sources: Source[];
}

export interface ReleaseDate {
  isoString: string;
  precision: Precision;
}

export enum Precision {
  Minute = "MINUTE",
}

export interface Restrictions {
  paywallContent: boolean;
}

export interface Playlists {
  items: PlaylistsItem[];
  totalCount: number;
}

export interface PlaylistsItem {
  __typename: MagentaTypename;
  data: IndigoData;
}

export enum MagentaTypename {
  PlaylistResponseWrapper = "PlaylistResponseWrapper",
}

export interface IndigoData {
  __typename: FriskyTypename;
  attributes: Attribute[];
  description: string;
  format: Format;
  images: Images;
  name: string;
  ownerV2: OwnerV2;
  uri: string;
}

export enum FriskyTypename {
  Playlist = "Playlist",
}

export interface Attribute {
  key: string;
  value: string;
}

export enum Format {
  Empty = "",
  InspiredbyMix = "inspiredby-mix",
}

export interface Images {
  items: CoverArtElement[];
}

export interface OwnerV2 {
  __typename: OwnerV2Typename;
  data: OwnerV2Data;
}

export enum OwnerV2Typename {
  UserResponseWrapper = "UserResponseWrapper",
}

export interface OwnerV2Data {
  __typename: MischievousTypename;
  avatar: DataCoverArt | null;
  name: string;
  uri: string;
  username: string;
}

export enum MischievousTypename {
  User = "User",
}

export interface Podcasts {
  items: PodcastsItem[];
  totalCount: number;
}

export interface PodcastsItem {
  __typename: PodcastV2Typename;
  data: IndecentData;
}

export interface IndecentData {
  __typename: CunningTypename;
  coverArt: CoverArtElement;
  mediaType: MediaType;
  name: string;
  publisher: Publisher;
  topics: Topics;
  uri: string;
}

export interface Topics {
  items: FluffyItem[];
}

export interface FluffyItem {
  __typename: BraggadociousTypename;
  title: string;
  uri: string;
}

export enum BraggadociousTypename {
  PodcastTopic = "PodcastTopic",
}

export interface TopResultsV2 {
  featured: any[];
  itemsV2: ItemsV2[];
}

export interface ItemsV2 {
  item: ItemsV2Item;
  matchedFields: string[];
}

export interface ItemsV2Item {
  __typename: string;
  data: HilariousData;
}

export interface HilariousData {
  __typename: string;
  albumOfTrack?: AlbumOfTrack;
  artists?: TopicsClass;
  associations?: Associations;
  contentRating?: ContentRating;
  duration?: Duration;
  id?: string;
  name?: string;
  playability?: FluffyPlayability;
  uri: string;
  profile?: Profile;
  visuals?: Visuals;
  attributes?: any[];
  description?: string;
  format?: string;
  images?: Images;
  ownerV2?: OwnerV2;
}

export interface AlbumOfTrack {
  coverArt: CoverArtElement;
  id: string;
  name: string;
  uri: string;
}

export interface Associations {
  associatedVideos: AssociatedVideos;
}

export interface AssociatedVideos {
  totalCount: number;
}

export interface FluffyPlayability {
  playable: boolean;
}

export interface TracksV2 {
  items: TracksV2Item[];
  totalCount: number;
}

export interface TracksV2Item {
  item: ItemItem;
  matchedFields: string[];
}

export interface ItemItem {
  __typename: Typename1;
  data: AmbitiousData;
}

export enum Typename1 {
  TrackResponseWrapper = "TrackResponseWrapper",
}

export interface AmbitiousData {
  __typename: Typename2;
  albumOfTrack: AlbumOfTrack;
  artists: TopicsClass;
  associations: Associations;
  contentRating: ContentRating;
  duration: Duration;
  id: string;
  name: string;
  playability: FluffyPlayability;
  uri: string;
}

export enum Typename2 {
  Track = "Track",
}

export interface Users {
  items: UsersItem[];
  totalCount: number;
}

export interface UsersItem {
  __typename: OwnerV2Typename;
  data: CunningData;
}

export interface CunningData {
  __typename: MischievousTypename;
  avatar: CoverArtElement | null;
  id: string;
  displayName: string;
  uri: string;
  username: string;
}

export interface Extensions {
  requestIds: RequestIDS;
}

export interface RequestIDS {
  "/searchV2": SearchV2V2;
  "/searchV2/topResultsV2": SearchV2V2;
}

export interface SearchV2V2 {
  "search-api": string;
}
