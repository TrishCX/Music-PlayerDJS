import { type Response, getInfo } from "youtube-stream-url";

export async function extractYoutubeStream(id: string): Promise<Response> {
  const info = await getInfo({
    url: `https://youtube.com/watch?v=${id}`,
  });
  return info;
}
