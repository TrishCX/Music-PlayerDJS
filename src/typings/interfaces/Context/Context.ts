import type { Type } from "../../../@types/index";

export namespace Context {
  export interface IContext {
    client: Type.Client;
    videoId?: string;
    extraData?: any;
  }
  export interface Response {
    body: {
      context: {
        capabilities?: {};
        client: {
          clientName: string;
          clientVersion: string;
        };
      };
    };
  }
}
