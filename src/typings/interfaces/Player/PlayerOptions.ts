import { CommandInteraction } from "discord.js";

export interface PlayerOptions<T> {
  metadata?: T;
  interaction?: CommandInteraction;
}
