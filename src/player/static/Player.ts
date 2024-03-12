/**
 * @since March 9th, 2024
 * @author Noir
 */

// @types
import type {
  PlayerOptions,
  PlayerStream,
  Player as TrackPlayer,
} from "../../typings";

import type { Type } from "../../@types/index";

import {
  Client,
  CommandInteraction,
  Guild,
  Collection,
  CategoryChannelChildManager,
} from "discord.js";
import { Stream } from "../../classes/index";
import { initializeVoiceChannel } from "../../helpers/voice/initVoiceChannel";
import { extractYoutubeStream } from "../../extractors/youtube-stream/extractStream";
import { Error } from "../../errors/err/err";

import Extractors from "../../classes/PlayerStream/Extractors";
import { makeQueueConstructor } from "../../helpers";
import { AudioPlayerStatus } from "@discordjs/voice";
import { getSuggestion } from "../../api/calls/youtube/functions /getSuggestions";

const _player = <T>(playerConstructor: TrackPlayer<T>) => {
  const createdCollection = new Collection<string, TrackPlayer<T>>();
  return createdCollection;
};

export default class Player extends Stream<Extractors> {
  client?: Client;
  isPaused?: boolean;
  isPlaying?: boolean;
  guild?: Guild;
  collection?: Collection<string, TrackPlayer<any>>;
  trackPlayer?: <T>(playerConstructor: TrackPlayer<T>) => any;
  initialized?: boolean;
  looped?: boolean;
  autoPlaying?: boolean;

  constructor(client: Client) {
    super();
  }

  public async initializeVoiceChannel(
    guild: Guild | null,
    interaction: CommandInteraction
  ) {
    const voiceState = await Error.checkVoiceError(interaction);
    return await initializeVoiceChannel(voiceState.channelId, guild as Guild);
  }

  public async useTrackPlayer() {
    const queue = this.collection?.get(this.guild?.id as string);
    return {
      ...this,
      queue,
    };
  }
  public async initialize() {
    if (this.initialized !== false)
      return new EvalError("Player is already initialized.");
    return (this.initialized = true);
  }
  /**
   * @param id The guild id.
   */
  public async pause(id: string) {
    if (!id) throw EvalError("No guild id provided.");
    if (typeof id !== "string") throw EvalError("Guild id must be a string.");
    const queue = this.collection?.get(id);
    if (!queue || queue === undefined || queue === null)
      throw EvalError("No player queue found.");
    this.isPaused = true;
    this.isPlaying = false;
    return this.player?.pause() === true
      ? EvalError("The player is already on pause.")
      : this.player?.pause();
  }
  /**
   *
   * @param id The guild id.
   */
  public async resume(id: string) {
    if (!id) throw EvalError("No guild id provided.");
    if (typeof id !== "string") throw EvalError("Guild id must be a string.");
    const queue = this.collection?.get(id);
    if (!queue || queue === undefined || queue === null)
      throw EvalError("No player queue found.");
    this.isPaused = false;
    this.isPlaying = true;
    return this.player?.pause() === false
      ? EvalError("The player is not paused.")
      : this.player?.unpause();
  }
  /**
   *
   * @param id The guild id.
   * @returns
   */
  public async stop(id: string) {
    if (!id) throw EvalError("No guild id provided.");
    if (typeof id !== "string") throw EvalError("Guild id must be a string.");
    const queue = this.collection?.get(id);
    if (!queue || queue === undefined || queue === null)
      throw EvalError("No player queue found.");
    this.isPaused = false;
    this.isPlaying = false;
    return this.player?.stop(false);
  }

  public async manageAudioPlayer(playerStream: PlayerStream) {
    const trackPlayer = this.collection?.get(this.guild?.id as string);
    const { queue } = trackPlayer!;

    this.player?.on(AudioPlayerStatus.Idle, async () => {
      if (queue?.length! > 1) {
        if (this.looped === true) {
          const currentQueueTrack = queue![0];
          const converted = await this.convertWithID(currentQueueTrack?._id);
          const convertedStream = await extractYoutubeStream(
            converted._id?.toString() as string
          );
          const stream = await this.makeStream(
            convertedStream.formats[convertedStream.formats.length - 1]
              .url! as string
          );
          this.manageAudioPlayer({ ...stream });
        } else {
          queue?.shift();
          const currentQueueTrack = queue![0];
          const converted = await this.convertWithID(currentQueueTrack?._id);
          const convertedStream = await extractYoutubeStream(
            converted._id?.toString() as string
          );
          const stream = await this.makeStream(
            convertedStream.formats[convertedStream.formats.length - 1]
              .url! as string
          );
          this.manageAudioPlayer({ ...stream });
        }
      } else {
        if (this.looped) {
          const currentQueueTrack = queue![0];
          const converted = await this.convertWithID(currentQueueTrack?._id);
          const convertedStream = await extractYoutubeStream(
            converted._id?.toString() as string
          );
          const stream = await this.makeStream(
            convertedStream.formats[convertedStream.formats.length - 1]
              .url! as string
          );
          this.manageAudioPlayer({ ...stream });
        } else if (this.autoPlaying) {
          const currentQueue = queue![0];
          queue?.shift();
          const converted = await this.convertWithID(currentQueue?._id!);
          const recommendations = await getSuggestion(converted?._id as string);
          const convertedStream = await extractYoutubeStream(
            recommendations[1]._id
          );
          console.log(converted);
          [
            {
              ...converted,
            },
          ].flatMap(async (song) =>
            String([
              {
                ...song,
                ...convertedStream.videoDetails,
                ...convertedStream.formats[convertedStream.formats.length - 1],
              },
            ])
          );
          // const stream = await this.makeStream(
          //   convertedStream.formats[convertedStream.formats.length - 1]
          //     .url! as string
          // );
          // const topResponse = await this.fetchTopSpotifySong(
          //   convertedStream.videoDetails.title
          // );
          // queue?.push({
          //   ...topResponse.queueData,
          // });
          // console.log(queue, "all queue", queue?.length);
        } else {
          queue?.shift();
          return console.log("Nothing is playing");
        }
      }
    });
  }

  /**
   *
   * @param id The guild id.
   * @param {boolean} toggle Toggles the autoplay mode.
   */
  public async autoplay(id: string, toggle: boolean) {
    if (!id) throw EvalError("No guild id provided.");
    if (typeof id !== "string") throw EvalError("Guild id must be a string.");
    const queue = this.collection?.get(id);
    if (!queue || queue === undefined || queue === null)
      throw EvalError("No player queue found.");

    if (toggle === true) {
      // if (
      //   this.autoPlaying === true &&
      //   typeof this.autoPlaying !== "undefined" &&
      //   typeof this.autoPlaying !== null
      // ) {
      //   return new EvalError("The player is already on autoplay mode.");
      // } else {
      //   return (this.autoPlaying = true);
      // }
      return (this.autoPlaying = true);
    } else {
      if (
        this.autoPlaying === false &&
        typeof this.autoPlaying !== "undefined" &&
        typeof this.autoPlaying !== null
      ) {
        return new EvalError("The player is not on autoplay mode.");
      } else {
        return (this.autoPlaying = false);
      }
    }
  }

  /**
   * @param id The guild id.
   * @param type The loop type "add" | "remove"
   * @type
   * ```js
   * Type.PlayerOptions.Loop
   * ```
   */
  public async loop(id: string, type: Type.PlayerOptions.Loop) {
    if (!id) throw EvalError("No guild id provided.");
    if (typeof id !== "string") throw EvalError("Guild id must be a string.");
    const queue = this.collection?.get(id);
    if (!queue || queue === undefined || queue === null)
      throw EvalError("No player queue found.");
    if (type === "add") {
      if (!this.looped || this.looped === undefined || this.looped == null) {
        return (this.looped = true);
      } else {
        return new EvalError("The player is already on a loop mode.");
      }
    } else {
      if (
        this.looped === true &&
        typeof this.looped !== "undefined" &&
        typeof this.looped !== null
      ) {
        return (this.looped = false);
      } else {
        return new EvalError("The player is not on a loop mode.");
      }
    }
  }

  public async play<T>(
    query: string,
    interaction: CommandInteraction,
    options?: PlayerOptions<T>
  ) {
    if (this.initialized === false || undefined)
      throw EvalError(
        "The player is not initialized, in order to execute the [play] function. You need to initialize the player instance."
      );

    const trackPlayerValue = this.collection?.get(
      interaction.guildId as string
    );
    if (trackPlayerValue?.queue?.length! > 0) {
      const topResponse = await this.fetchTopSpotifySong(query);
      trackPlayerValue?.queue?.push({
        ...topResponse.queueData,
      });
    } else {
      this.connection = await this.initializeVoiceChannel(
        interaction.guild,
        interaction
      );
      const topResponse = await this.fetchTopSpotifySong(query);
      const converted = await this.convertWithID(topResponse._id);
      const stream = await extractYoutubeStream(
        converted._id?.toString() as string
      );
      const initialStream = stream.formats[stream.formats.length - 1];
      const playerStream = await this.makeStream(initialStream.url);
      this.guild = interaction.guild as Guild;
      const queueConstructor = makeQueueConstructor<T>({
        interaction,
        track: topResponse.queueData,
        metadata: options?.metadata,
      });
      this.collection = _player({
        ...queueConstructor,
      });
      this.collection.set(interaction.guildId as string, queueConstructor);
      this.initialized = true;
      this.manageAudioPlayer({
        ...playerStream,
      });
    }
  }
}

[{ name: String, default: [String] }].map(async () => {});
