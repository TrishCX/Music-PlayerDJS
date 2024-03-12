import { joinVoiceChannel } from "@discordjs/voice";
import { Guild } from "discord.js";

export async function initializeVoiceChannel(
  channelId: string | null,
  guild: Guild
) {
  return await joinVoiceChannel({
    channelId: channelId as string,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
    debug: true,
    group: "music",
  });
}
