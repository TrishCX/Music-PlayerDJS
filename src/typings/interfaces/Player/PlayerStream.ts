import { AudioPlayer, AudioResource, VoiceConnection } from "@discordjs/voice";

export interface PlayerStream {
  player: AudioPlayer;
  resource: AudioResource<unknown>;
  connection: VoiceConnection | undefined;
}
