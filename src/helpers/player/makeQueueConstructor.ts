import type { QueueConstructor } from "../../typings";

export function makeQueueConstructor<T>(constructor: QueueConstructor<T>) {
  return {
    interaction: constructor.interaction,
    metadata: constructor.metadata,
    queue: [
      {
        _id: constructor.track._id,
        album: constructor.track.album,
        artists: constructor.track.artists,
        duration: constructor.track.duration,
        image: constructor.track.image,
        name: constructor.track.name,
        url: constructor.track?.url,
      },
    ],
  };
}
