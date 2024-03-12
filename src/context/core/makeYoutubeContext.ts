import { Context } from "../../typings/index";

export function makeYouTubeContextStructure(
  context: Context.IContext
): Context.Response {
  const { ...props } = context;

  return {
    body: {
      context: {
        capabilities: {},
        client: {
          clientName: props.client.name,
          clientVersion: props.client.version,
        },
      },
    },
  };
}
