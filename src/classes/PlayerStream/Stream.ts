import {
  AudioPlayer,
  AudioResource,
  NoSubscriberBehavior,
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import {
  spotifySearchTracks,
  spotifyTopResultTrack,
} from "../../api/calls/spotify/functions";
import {
  spotifyConversion,
  spotifyConversionWithSongParam,
} from "../../conversions";
import Extractors from "./Extractors";

export default class Stream<Extractors> extends Extractors {
  player?: AudioPlayer;
  resource?: AudioResource;
  connection?: VoiceConnection;

  public async search(query: string) {
    return await spotifySearchTracks(query);
  }

  public async makeStream(url: string) {
    this.resource = await createAudioResource(url, {
      inlineVolume: true,
    });
    this.player = await createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });
    this.connection?.subscribe(this.player);
    this.player.play(this.resource);
    return {
      player: this.player,
      resource: this.resource,
      connection: this.connection,
    };
  }
  public async convertWithID(id: string) {
    return await spotifyConversion(id);
  }
  public async convertWithSongAndArtist(song: string, artist: string) {
    return await spotifyConversionWithSongParam(song, artist);
  }
  public async fetchTopSpotifySong(query: string) {
    return await spotifyTopResultTrack(query);
  }
}
