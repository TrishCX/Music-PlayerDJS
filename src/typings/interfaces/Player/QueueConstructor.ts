import { CommandInteraction } from "discord.js";
import { Queue } from "./Queue";

export interface QueueConstructor<T> {
  interaction: CommandInteraction;
  track: Queue;
  metadata?: T;
}
