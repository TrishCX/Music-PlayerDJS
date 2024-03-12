import { CommandInteraction } from "discord.js";

export async function checkVoiceError(interaction: CommandInteraction) {
  const client = interaction.guild?.members?.me;
  const member = interaction.guild?.members.cache.get(interaction.user.id);
  if (!client) throw new Error("Client not found");

  if (!member?.voice.channel)
    throw new Error(
      "You must be in a voice channel before executing this action."
    );
  if (client.voice.channel && client.voice.channelId !== member.voice.channelId)
    throw new Error(
      "The client and the [User] who is performing this action should be connected in the same voice channel."
    );
  if (!member.voice.channel.joinable)
    throw new Error(
      `The voice channel named: ${member.voice.channel.name} [${member.voice.channelId}] is not joinable. Please make sure the client has enough permission to join your voice channel and perform this action.`
    );
  if (member.voice.channel.userLimit !== 0 || member.voice.channel.full)
    throw new Error(
      `The voice channel named: ${member.voice.channel.name} [${member.voice.channelId}] is not currently full. Please make sure the client has enough permission to connect to the voice channel.`
    );

  return member.voice;
}

export { CommandInteraction };
