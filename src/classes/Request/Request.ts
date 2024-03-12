import axios from "axios";
import { getRandomizeChoice, getHeaders } from "../../utilities";
import { YOUTUBE_MUSIC } from "../../api/calls/spotify/constants/youtube-music";

export class Request {
  url?: string;
  body?: any;
  public async get(url: string, body?: any) {
    this.url = String(url);
    this.body = body as any;
    const request = await axios.get(this.url, {
      headers: {
        ...(this.body as any),

        "User-Agent": getHeaders({ mobile: getRandomizeChoice() }),
      },
    });

    const response = await request.data;
    return response;
  }

  public async post(url: string, body?: any) {
    this.url = String(url);
    this.body = body as any;
    const request = await axios.post(this.url, this.body, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    const response: any = await request.data;
    return response;
  }
}
