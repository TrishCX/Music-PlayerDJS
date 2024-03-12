// import { getInfo } from "youtube-stream-url";

// getInfo({
//   url: "https://music.youtube.com/watch?v=-MtKC5wXqdQ&si=mTFXwMXYObsqbzbo",
//   throwOnError: true,
// }).then((video) => console.log(video.formats[0].url));
import { getSuggestion } from "./api/calls/youtube/functions /getSuggestions";

getSuggestion("B8utVbarxnw").then((response) => console.log(response));
