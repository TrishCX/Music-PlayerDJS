import { PlayerOptions } from "./PlayerOptions";
import { Queue } from "./Queue";

export interface Player<T> extends PlayerOptions<T> {
  queue?: Queue[];
}
